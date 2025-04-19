import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Building, 
  Coffee, 
  Compass, 
  Info, 
  Library, 
  MapPin, 
  ParkingSquare, 
  School, 
  Search, 
  Utensils, 
  Wifi, 
  Home
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// VIT Chennai coordinates
const VIT_CHENNAI_COORDS: [number, number] = [12.8406, 80.1534]; // [latitude, longitude]

// Points of interest on campus
const campusLocations = [
  {
    id: 1,
    name: "Main Academic Block",
    category: "academic",
    coordinates: [12.8406, 80.1534] as [number, number],
    description: "Houses engineering classrooms, labs, and faculty offices",
    icon: <School className="h-4 w-4" />,
  },
  {
    id: 2,
    name: "Central Library",
    category: "facility",
    coordinates: [12.8409, 80.1532] as [number, number],
    description: "Main library with study spaces and digital resources",
    icon: <Library className="h-4 w-4" />,
  },
  {
    id: 3,
    name: "Mens Hostel",
    category: "residence",
    coordinates: [12.8396, 80.1539] as [number, number],
    description: "On-campus accommodation for male students",
    icon: <Home className="h-4 w-4" />,
  },
  {
    id: 4,
    name: "Womens Hostel",
    category: "residence",
    coordinates: [12.8421, 80.1529] as [number, number],
    description: "On-campus accommodation for female students",
    icon: <Home className="h-4 w-4" />,
  },
  {
    id: 5,
    name: "Food Court",
    category: "dining",
    coordinates: [12.8403, 80.1541] as [number, number],
    description: "Multiple food options available for students and faculty",
    icon: <Utensils className="h-4 w-4" />,
  },
  {
    id: 6,
    name: "Sports Complex",
    category: "sports",
    coordinates: [12.8389, 80.1530] as [number, number],
    description: "Includes indoor and outdoor sports facilities",
    icon: <Compass className="h-4 w-4" />,
  },
  {
    id: 7,
    name: "Administrative Block",
    category: "administrative",
    coordinates: [12.8411, 80.1536] as [number, number],
    description: "Houses administration offices and registration",
    icon: <Building className="h-4 w-4" />,
  },
  {
    id: 8,
    name: "Parking Area",
    category: "facility",
    coordinates: [12.8399, 80.1525] as [number, number],
    description: "Main parking lot for students and visitors",
    icon: <ParkingSquare className="h-4 w-4" />,
  },
  {
    id: 9,
    name: "Coffee Shop",
    category: "dining",
    coordinates: [12.8408, 80.1539] as [number, number],
    description: "Campus coffee shop for quick refreshments",
    icon: <Coffee className="h-4 w-4" />,
  },
  {
    id: 10,
    name: "WiFi Hotspot",
    category: "facility",
    coordinates: [12.8404, 80.1533] as [number, number],
    description: "Strong WiFi connectivity zone",
    icon: <Wifi className="h-4 w-4" />,
  },
];

// Categories for filtering
const categories = [
  { value: "all", label: "All Locations" },
  { value: "academic", label: "Academic Buildings" },
  { value: "residence", label: "Residence Halls" },
  { value: "dining", label: "Dining" },
  { value: "facility", label: "Facilities" },
  { value: "sports", label: "Sports" },
  { value: "administrative", label: "Administrative" },
];

// Component to handle map view changes
const MapController = ({ center, zoom, mapType }: { center: [number, number], zoom: number, mapType: string }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  useEffect(() => {
    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });
    
    // Add the new tile layer based on mapType
    if (mapType === 'satellite') {
      L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
      }).addTo(map);
    } else if (mapType === 'hybrid') {
      L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
      }).addTo(map);
    } else {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    }
  }, [mapType, map]);
  
  return null;
};

type LocationType = typeof campusLocations[0];

const CampusMap = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);
  const [mapZoom, setMapZoom] = useState(16);
  const [mapType, setMapType] = useState("satellite");
  const [mapCenter, setMapCenter] = useState<[number, number]>(VIT_CHENNAI_COORDS);
  
  // Filter locations based on category and search query
  const filteredLocations = campusLocations.filter(location => {
    const matchesCategory = selectedCategory === "all" || location.category === selectedCategory;
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        location.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Update center and zoom when location is selected
  useEffect(() => {
    if (selectedLocation) {
      setMapCenter(selectedLocation.coordinates);
      setMapZoom(18);
    }
  }, [selectedLocation]);
  
  // Change map type (satellite, standard, etc.)
  const changeMapType = (type: string) => {
    setMapType(type);
  };
  
  return (
    <Layout>
      <div className="container py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campus Map</h1>
            <p className="text-muted-foreground">
              Explore VIT Chennai campus and find important locations
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => changeMapType('satellite')}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Satellite
            </Button>
            <Button 
              variant="outline" 
              onClick={() => changeMapType('hybrid')}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Hybrid
            </Button>
            <Button 
              variant="outline" 
              onClick={() => changeMapType('standard')}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Standard
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with filters and locations list */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search and filter */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Find Locations</CardTitle>
                <CardDescription>Search for campus locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search locations..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            {/* Locations list */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Campus Locations</CardTitle>
                <CardDescription>
                  {filteredLocations.length} locations found
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[400px] overflow-y-auto">
                  {filteredLocations.length > 0 ? (
                    <div className="divide-y">
                      {filteredLocations.map((location) => (
                        <div 
                          key={location.id} 
                          className={`p-3 hover:bg-accent cursor-pointer transition-colors ${
                            selectedLocation?.id === location.id ? 'bg-accent' : ''
                          }`}
                          onClick={() => setSelectedLocation(location)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 bg-primary/10 p-2 rounded-full text-primary">
                              {location.icon}
                            </div>
                            <div>
                              <h3 className="font-medium">{location.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {location.description}
                              </p>
                              <Badge variant="outline" className="mt-2">
                                {categories.find(c => c.value === location.category)?.label || location.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      No locations found for this search
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main map area */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <div className="h-[600px]">
                {typeof window !== 'undefined' && (
                  <MapContainer
                    center={VIT_CHENNAI_COORDS}
                    zoom={mapZoom}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <MapController center={mapCenter} zoom={mapZoom} mapType={mapType} />
                    
                    {/* Main VIT Marker */}
                    <Marker position={VIT_CHENNAI_COORDS}>
                      <Popup>
                        <b>VIT Chennai</b><br />
                        Vandalur-Kelambakkam Road, Chennai
                      </Popup>
                    </Marker>
                    
                    {/* Display filtered location markers */}
                    {filteredLocations.map((location) => (
                      <Marker 
                        key={location.id} 
                        position={location.coordinates}
                        eventHandlers={{
                          click: () => {
                            setSelectedLocation(location);
                          },
                        }}
                      >
                        <Popup>
                          <b>{location.name}</b><br />
                          {location.description}
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}
              </div>
            </Card>
            
            {/* Selected location details */}
            {selectedLocation && (
              <Card className="mt-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{selectedLocation.name}</CardTitle>
                    <Badge>
                      {categories.find(c => c.value === selectedLocation.category)?.label || selectedLocation.category}
                    </Badge>
                  </div>
                  <CardDescription>{selectedLocation.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Coordinates: {selectedLocation.coordinates[0]}, {selectedLocation.coordinates[1]}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CampusMap; 