
import { useState } from "react";
import { Split, PlusCircle, DollarSign, Users, ArrowRight, UserPlus, Trash2, Receipt, Activity, PieChart, Search } from "lucide-react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

type Friend = {
  id: string;
  name: string;
  avatar: string;
  owes: number;
  owed: number;
};

type Expense = {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  paidBy: string;
  splitWith: {
    id: string;
    name: string;
    avatar: string;
    amount: number;
    settled: boolean;
  }[];
};

type Group = {
  id: string;
  name: string;
  members: number;
  totalExpenses: number;
  lastActive: string;
  category: string;
};

const SplitWise = () => {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      owes: 0,
      owed: 45.50
    },
    {
      id: '2',
      name: 'Sophia Williams',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      owes: 28.75,
      owed: 0
    },
    {
      id: '3',
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      owes: 15.20,
      owed: 0
    },
    {
      id: '4',
      name: 'Emma Davis',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
      owes: 0,
      owed: 12.60
    }
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      title: 'Pizza Night',
      amount: 45.50,
      date: '2 days ago',
      category: 'Food',
      paidBy: 'You',
      splitWith: [
        {
          id: '1',
          name: 'Alex Johnson',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          amount: 15.16,
          settled: false
        },
        {
          id: '2',
          name: 'Sophia Williams',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          amount: 15.17,
          settled: false
        },
        {
          id: '3',
          name: 'Michael Chen',
          avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
          amount: 15.17,
          settled: false
        }
      ]
    },
    {
      id: '2',
      title: 'Movie Tickets',
      amount: 28.75,
      date: '1 week ago',
      category: 'Entertainment',
      paidBy: 'Sophia Williams',
      splitWith: [
        {
          id: 'you',
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          amount: 14.37,
          settled: false
        },
        {
          id: '3',
          name: 'Michael Chen',
          avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
          amount: 14.38,
          settled: true
        }
      ]
    },
    {
      id: '3',
      title: 'Coffee Study Session',
      amount: 12.60,
      date: '3 days ago',
      category: 'Food',
      paidBy: 'You',
      splitWith: [
        {
          id: '4',
          name: 'Emma Davis',
          avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
          amount: 6.30,
          settled: false
        }
      ]
    }
  ]);

  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Apartment 5B',
      members: 4,
      totalExpenses: 345.25,
      lastActive: '2 days ago',
      category: 'Home'
    },
    {
      id: '2',
      name: 'Road Trip Gang',
      members: 6,
      totalExpenses: 578.90,
      lastActive: '1 week ago',
      category: 'Travel'
    },
    {
      id: '3',
      name: 'CS Study Group',
      members: 5,
      totalExpenses: 83.15,
      lastActive: '3 days ago',
      category: 'Education'
    }
  ]);

  // Form states
  const [newExpenseTitle, setNewExpenseTitle] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [newExpenseCategory, setNewExpenseCategory] = useState("Food");
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [splitEqually, setSplitEqually] = useState(true);
  const [expenseDetail, setExpenseDetail] = useState<Expense | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filtered friends for search
  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new expense
  const handleAddExpense = () => {
    if (!newExpenseTitle || !newExpenseAmount || selectedFriends.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(newExpenseAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    // Calculate split amount per person (including you)
    const splitAmount = splitEqually 
      ? amount / (selectedFriends.length + 1)
      : 0; // We'd handle custom splits in a real app

    const newExpense: Expense = {
      id: Date.now().toString(),
      title: newExpenseTitle,
      amount: amount,
      date: 'Just now',
      category: newExpenseCategory,
      paidBy: 'You',
      splitWith: selectedFriends.map(friendId => {
        const friend = friends.find(f => f.id === friendId);
        return {
          id: friendId,
          name: friend?.name || '',
          avatar: friend?.avatar || '',
          amount: splitAmount,
          settled: false
        };
      })
    };

    // Update expenses
    setExpenses([newExpense, ...expenses]);

    // Update balances
    const updatedFriends = friends.map(friend => {
      if (selectedFriends.includes(friend.id)) {
        return {
          ...friend,
          owes: friend.owes + splitAmount
        };
      }
      return friend;
    });
    setFriends(updatedFriends);

    // Reset form
    setNewExpenseTitle("");
    setNewExpenseAmount("");
    setNewExpenseCategory("Food");
    setSelectedFriends([]);

    toast({
      title: "Expense added",
      description: `${newExpenseTitle} expense has been added and split`,
    });
  };

  // Settle up with a friend
  const handleSettleUp = (friendId: string) => {
    const friend = friends.find(f => f.id === friendId);
    if (!friend) return;

    // Update the friend's balance
    const updatedFriends = friends.map(f => {
      if (f.id === friendId) {
        return {
          ...f,
          owes: 0,
          owed: 0
        };
      }
      return f;
    });
    setFriends(updatedFriends);

    // Mark expenses as settled
    const updatedExpenses = expenses.map(expense => {
      return {
        ...expense,
        splitWith: expense.splitWith.map(split => {
          if (split.id === friendId) {
            return {
              ...split,
              settled: true
            };
          }
          return split;
        })
      };
    });
    setExpenses(updatedExpenses);

    toast({
      title: "Settled up",
      description: `You've settled up with ${friend.name}`,
    });
  };

  // View expense details
  const viewExpenseDetails = (expense: Expense) => {
    setExpenseDetail(expense);
  };

  // Delete expense
  const deleteExpense = (expenseId: string) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseId));
    setExpenseDetail(null);
    
    toast({
      title: "Expense deleted",
      description: "The expense has been deleted",
    });
  };

  // Helper function to get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Food':
        return 'bg-orange-100 text-orange-800';
      case 'Entertainment':
        return 'bg-purple-100 text-purple-800';
      case 'Travel':
        return 'bg-blue-100 text-blue-800';
      case 'Home':
        return 'bg-green-100 text-green-800';
      case 'Education':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Toggle friend selection for expense splitting
  const toggleFriendSelection = (friendId: string) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter(id => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16 pb-8 px-4 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="bg-vimate-purple/10 p-3 rounded-full mr-3">
            <Split className="h-6 w-6 text-vimate-purple" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-vimate-purple to-vimate-orange bg-clip-text text-transparent">
            Split Expenses
          </h1>
        </motion.div>
        
        {/* Summary Cards */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          <motion.div variants={item}>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-green-700">Total Owed to You</p>
                    <h3 className="text-2xl font-bold text-green-800">${friends.reduce((total, friend) => total + friend.owes, 0).toFixed(2)}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <ArrowRight className="h-6 w-6 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-red-700">You Owe</p>
                    <h3 className="text-2xl font-bold text-red-800">${friends.reduce((total, friend) => total + friend.owed, 0).toFixed(2)}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                    <ArrowRight className="h-6 w-6 text-red-700 transform rotate-180" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="border-vimate-purple bg-vimate-purple/5">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-vimate-purple">Total Expenses</p>
                    <h3 className="text-2xl font-bold text-vimate-purple-dark">${expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2)}</h3>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-vimate-purple">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Expense
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Expense</DialogTitle>
                        <DialogDescription>
                          Enter the details of your expense to split with friends
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="expense-title">Expense Title</Label>
                          <Input 
                            id="expense-title" 
                            placeholder="e.g., Dinner, Movie tickets" 
                            value={newExpenseTitle}
                            onChange={(e) => setNewExpenseTitle(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="expense-amount">Amount</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                              id="expense-amount" 
                              type="number" 
                              min="0" 
                              step="0.01" 
                              placeholder="0.00" 
                              className="pl-10"
                              value={newExpenseAmount}
                              onChange={(e) => setNewExpenseAmount(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="expense-category">Category</Label>
                          <Select 
                            value={newExpenseCategory} 
                            onValueChange={setNewExpenseCategory}
                          >
                            <SelectTrigger id="expense-category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Food">Food & Drinks</SelectItem>
                              <SelectItem value="Entertainment">Entertainment</SelectItem>
                              <SelectItem value="Travel">Travel</SelectItem>
                              <SelectItem value="Home">Home/Rent</SelectItem>
                              <SelectItem value="Education">Education</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Split with</Label>
                          <div className="border rounded-md max-h-48 overflow-y-auto">
                            {friends.map((friend) => (
                              <div 
                                key={friend.id}
                                className={`p-3 flex items-center justify-between hover:bg-slate-50 border-b last:border-0 cursor-pointer ${
                                  selectedFriends.includes(friend.id) ? 'bg-slate-50' : ''
                                }`}
                                onClick={() => toggleFriendSelection(friend.id)}
                              >
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage src={friend.avatar} alt={friend.name} />
                                    <AvatarFallback>{friend.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium">{friend.name}</span>
                                </div>
                                {selectedFriends.includes(friend.id) && (
                                  <Badge className="bg-vimate-purple">Selected</Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>How to split?</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <Button 
                              type="button" 
                              variant={splitEqually ? "default" : "outline"}
                              className={splitEqually ? "bg-vimate-purple" : ""}
                              onClick={() => setSplitEqually(true)}
                            >
                              Split Equally
                            </Button>
                            <Button 
                              type="button" 
                              variant={!splitEqually ? "default" : "outline"}
                              className={!splitEqually ? "bg-vimate-purple" : ""}
                              onClick={() => setSplitEqually(false)}
                              disabled={true} // For demo purposes
                            >
                              Custom Split
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button className="w-full bg-vimate-purple" onClick={handleAddExpense}>
                          Add Expense
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="friends">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-lg">Friends</CardTitle>
                    <CardDescription>Manage your expenses with friends</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Search friends..." 
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <Button className="w-full bg-vimate-purple">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Friend
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3">
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {filteredFriends.length > 0 ? (
                    filteredFriends.map((friend) => (
                      <motion.div key={friend.id} variants={item}>
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={friend.avatar} alt={friend.name} />
                                  <AvatarFallback>{friend.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{friend.name}</h3>
                                  <div className="flex items-center mt-1">
                                    {friend.owes > 0 ? (
                                      <p className="text-sm text-green-600 font-medium">
                                        owes you ${friend.owes.toFixed(2)}
                                      </p>
                                    ) : friend.owed > 0 ? (
                                      <p className="text-sm text-red-600 font-medium">
                                        you owe ${friend.owed.toFixed(2)}
                                      </p>
                                    ) : (
                                      <p className="text-sm text-gray-500">
                                        all settled up
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                {(friend.owes > 0 || friend.owed > 0) && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="border-vimate-purple text-vimate-purple hover:bg-vimate-purple/10"
                                    onClick={() => handleSettleUp(friend.id)}
                                  >
                                    Settle Up
                                  </Button>
                                )}
                                <Button 
                                  size="sm"
                                  className="bg-vimate-purple"
                                  onClick={() => {
                                    setSelectedFriends([friend.id]);
                                    document.querySelector('[data-dialog-trigger="add-expense"]')?.click();
                                  }}
                                >
                                  Add Expense
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <Card className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Users className="h-12 w-12 text-slate-300 mb-3" />
                        <h3 className="text-lg font-medium mb-1">No friends found</h3>
                        <p className="text-sm text-slate-500 mb-4">
                          {searchQuery ? "Try a different search term" : "Add friends to split expenses"}
                        </p>
                        <Button className="bg-vimate-purple">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Add Friend
                        </Button>
                      </div>
                    </Card>
                  )}
                </motion.div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="expenses">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-lg">Expenses</CardTitle>
                    <CardDescription>View and track all your expenses</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Filter by Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All categories</SelectItem>
                          <SelectItem value="Food">Food & Drinks</SelectItem>
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="Travel">Travel</SelectItem>
                          <SelectItem value="Home">Home/Rent</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Time Period</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All time</SelectItem>
                          <SelectItem value="month">This month</SelectItem>
                          <SelectItem value="week">This week</SelectItem>
                          <SelectItem value="day">Today</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      className="w-full bg-vimate-purple" 
                      data-dialog-trigger="add-expense"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Expense
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3">
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {expenses.map((expense) => (
                    <motion.div key={expense.id} variants={item}>
                      <Card 
                        className="hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => viewExpenseDetails(expense)}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{expense.title}</h3>
                                <Badge className={`ml-2 ${getCategoryColor(expense.category)}`}>
                                  {expense.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500">{expense.date}</p>
                            </div>
                            <p className="font-bold text-lg">${expense.amount.toFixed(2)}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">{expense.paidBy === 'You' ? 'You' : expense.paidBy}</span> paid
                            </p>
                            <div className="flex -space-x-2 mb-2">
                              {expense.paidBy === 'You' && (
                                <Avatar className="h-8 w-8 border-2 border-white">
                                  <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="You" />
                                  <AvatarFallback>You</AvatarFallback>
                                </Avatar>
                              )}
                              {expense.splitWith.map((person) => (
                                <Avatar key={person.id} className="h-8 w-8 border-2 border-white">
                                  <AvatarImage src={person.avatar} alt={person.name} />
                                  <AvatarFallback>{person.name[0]}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500">
                              Split with {expense.splitWith.length} {expense.splitWith.length === 1 ? 'person' : 'people'}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="groups">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-lg">Groups</CardTitle>
                    <CardDescription>Manage expenses with groups</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-vimate-purple">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create Group
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3">
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {groups.map((group) => (
                    <motion.div key={group.id} variants={item}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{group.name}</h3>
                                <Badge className={`ml-2 ${getCategoryColor(group.category)}`}>
                                  {group.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500">Last active: {group.lastActive}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">${group.totalExpenses.toFixed(2)}</p>
                              <p className="text-xs text-gray-500">{group.members} members</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-vimate-purple text-vimate-purple hover:bg-vimate-purple/10"
                            >
                              <Activity className="h-4 w-4 mr-2" />
                              Activity
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-vimate-purple"
                            >
                              <PlusCircle className="h-4 w-4 mr-2" />
                              Add Expense
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Expense Detail Dialog */}
      {expenseDetail && (
        <Dialog open={!!expenseDetail} onOpenChange={(open) => !open && setExpenseDetail(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{expenseDetail.title}</span>
                <Badge className={getCategoryColor(expenseDetail.category)}>
                  {expenseDetail.category}
                </Badge>
              </DialogTitle>
              <DialogDescription>
                Added {expenseDetail.date}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <p className="text-sm text-gray-500">Total amount</p>
                  <p className="text-2xl font-bold">${expenseDetail.amount.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Paid by</p>
                  <p className="font-medium">{expenseDetail.paidBy}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Split details</h4>
                <div className="space-y-2">
                  {expenseDetail.splitWith.map((person) => (
                    <div key={person.id} className="flex justify-between items-center p-2 bg-slate-50 rounded-md">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={person.avatar} alt={person.name} />
                          <AvatarFallback>{person.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{person.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${person.amount.toFixed(2)}</p>
                        {person.settled ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                            Settled
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 text-xs">
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                className="border-red-500 text-red-500 hover:bg-red-50"
                onClick={() => deleteExpense(expenseDetail.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button className="bg-vimate-purple">
                <Receipt className="h-4 w-4 mr-2" />
                View Receipt
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SplitWise;
