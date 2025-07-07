import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Search, Play, Pause, Square, Eye, Filter, Calendar } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const CampaignMonitoring = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');

  // Mock data for campaigns
  const campaigns = [
    {
      id: 1,
      name: 'New Year Sale 2024',
      clientName: 'E-commerce Plus',
      clientId: 'client_001',
      status: 'running',
      type: 'scheduled',
      totalMessages: 15000,
      sent: 12500,
      delivered: 11800,
      failed: 200,
      scheduled: '2024-01-15 09:00',
      startTime: '2024-01-15 09:00',
      endTime: '2024-01-15 18:00',
      progress: 83
    },
    {
      id: 2,
      name: 'Welcome Campaign',
      clientName: 'Financial Services Ltd',
      clientId: 'client_002',
      status: 'completed',
      type: 'bulk',
      totalMessages: 5000,
      sent: 5000,
      delivered: 4950,
      failed: 50,
      scheduled: '2024-01-14 10:00',
      startTime: '2024-01-14 10:00',
      endTime: '2024-01-14 12:30',
      progress: 100
    },
    {
      id: 3,
      name: 'Weekend Promo',
      clientName: 'Retail Chain Co',
      clientId: 'client_004',
      status: 'paused',
      type: 'scheduled',
      totalMessages: 25000,
      sent: 8000,
      delivered: 7600,
      failed: 100,
      scheduled: '2024-01-16 08:00',
      startTime: '2024-01-16 08:00',
      endTime: '2024-01-16 20:00',
      progress: 32
    },
    {
      id: 4,
      name: 'Product Launch Alert',
      clientName: 'Tech Startup Inc',
      clientId: 'client_005',
      status: 'scheduled',
      type: 'scheduled',
      totalMessages: 8000,
      sent: 0,
      delivered: 0,
      failed: 0,
      scheduled: '2024-01-17 11:00',
      startTime: null,
      endTime: null,
      progress: 0
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'running':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Running</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'paused':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Paused</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Scheduled</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handlePauseCampaign = (id, name) => {
    toast({
      title: "Campaign Paused",
      description: `Campaign "${name}" has been paused.`,
    });
  };

  const handleResumeCampaign = (id, name) => {
    toast({
      title: "Campaign Resumed",
      description: `Campaign "${name}" has been resumed.`,
    });
  };

  const handleCancelCampaign = (id, name) => {
    toast({
      title: "Campaign Cancelled",
      description: `Campaign "${name}" has been cancelled.`,
      variant: "destructive",
    });
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesClient = clientFilter === 'all' || campaign.clientId === clientFilter;
    return matchesSearch && matchesStatus && matchesClient;
  });

  const uniqueClients = [...new Set(campaigns.map(c => ({ id: c.clientId, name: c.clientName })))];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Campaign Monitoring
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Monitor and manage all client campaigns in real-time</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-indigo-50">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-gray-700">Total Campaigns</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">4</div>
              <p className="text-sm text-gray-600 mt-1">All campaigns</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-blue-50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-gray-700">Running</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                <Badge variant="outline" className="border-0 bg-white/90 text-blue-700 font-semibold">1</Badge>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">1</div>
              <p className="text-sm text-gray-600 mt-1">Active now</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-purple-50">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-gray-700">Scheduled</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500">
                <Badge variant="outline" className="border-0 bg-white/90 text-purple-700 font-semibold">1</Badge>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">1</div>
              <p className="text-sm text-gray-600 mt-1">Upcoming</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-gray-700">Completed</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500">
                <Badge variant="outline" className="border-0 bg-white/90 text-emerald-700 font-semibold">1</Badge>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">1</div>
              <p className="text-sm text-gray-600 mt-1">Finished</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-amber-50">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-500/5"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-gray-700">Paused</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500">
                <Badge variant="outline" className="border-0 bg-white/90 text-amber-700 font-semibold">1</Badge>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">1</div>
              <p className="text-sm text-gray-600 mt-1">On hold</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-white via-blue-50 to-purple-50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                  <Input
                    placeholder="Search campaigns or clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-52 border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white/80 backdrop-blur-sm">
                  <Filter className="h-4 w-4 mr-2 text-blue-500" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border-blue-200">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger className="w-full md:w-52 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="Filter by client" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border-purple-200">
                  <SelectItem value="all">All Clients</SelectItem>
                  {uniqueClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns Table */}
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="text-white text-xl font-bold">Campaign Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Messages</TableHead>
                  <TableHead>Delivery Rate</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-gray-500">ID: {campaign.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{campaign.clientName}</div>
                        <div className="text-sm text-gray-500">{campaign.clientId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{campaign.progress}%</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Total: {campaign.totalMessages.toLocaleString()}</div>
                        <div>Sent: {campaign.sent.toLocaleString()}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {campaign.sent > 0 ? (
                        <div className="text-sm">
                          <div className="text-green-600">
                            {((campaign.delivered / campaign.sent) * 100).toFixed(1)}%
                          </div>
                          <div className="text-red-600">
                            Failed: {campaign.failed}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{campaign.scheduled}</div>
                        {campaign.status === 'running' && campaign.endTime && (
                          <div className="text-gray-500">Ends: {campaign.endTime}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {campaign.status === 'running' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePauseCampaign(campaign.id, campaign.name)}
                            className="text-yellow-600 hover:bg-yellow-50"
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        )}
                        {campaign.status === 'paused' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleResumeCampaign(campaign.id, campaign.name)}
                            className="text-green-600 hover:bg-green-50"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        {(campaign.status === 'scheduled' || campaign.status === 'paused') && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCancelCampaign(campaign.id, campaign.name)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Square className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CampaignMonitoring;