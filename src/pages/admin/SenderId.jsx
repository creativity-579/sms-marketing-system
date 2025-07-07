import React, { useState, useEffect } from "react";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Search, Check, X, Eye, Filter } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { useAdminHook } from "../../hooks/useAdminHook";

const ManagementSenderIds = () => {
  const [senderIds, setSenderIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const { getSenderIds, changeStatus } =
    useAdminHook();

  const totalPendingReview = senderIds.filter(
    (request) => request.status == "pending"
  );
  const totalApproved = senderIds.filter(
    (request) => request.status == "approved"
  );
  const totalRejected = senderIds.filter(
    (request) => request.status == "rejected"
  );

  const filteredRequests =
    senderIds &&
    senderIds.filter((request) => {
      const matchesSearch = request.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      request.user_id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || request.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const fetchSenderIds = async () => {
    setLoading(true);
    try {
      const res = await getSenderIds();
      setSenderIds(res.data.senderIds);
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, _status) => {
    try {
      let updateData = { status: _status };
      let res = await changeStatus(id, updateData);
      if (res.data.message !== "success") throw new error(res.data.message);
      fetchSenderIds();
      toast({
        title: `Sender ID ${_status}`,
        description: `Sender ID has been ${_status} successfully.`,
      });
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    fetchSenderIds();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              Sender ID Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Review and manage sender ID requests from clients
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-purple-50">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-gray-700">
                Total Requests
              </CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <Badge
                  variant="outline"
                  className="border-0 bg-white/90 text-purple-700 font-semibold"
                >
                  {senderIds.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {senderIds.length}
              </div>
              <p className="text-sm text-gray-600 mt-1">All time requests</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-yellow-50">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-gray-700">
                Pending Review
              </CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                <Badge
                  variant="outline"
                  className="border-0 bg-white/90 text-yellow-700 font-semibold"
                >
                  {totalPendingReview.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {totalPendingReview.length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-green-50">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-gray-700">
                Approved
              </CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                <Badge
                  variant="outline"
                  className="border-0 bg-white/90 text-green-700 font-semibold"
                >
                  {totalApproved.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {totalApproved.length}
              </div>
              <p className="text-sm text-gray-600 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-red-50">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-gray-700">
                Rejected
              </CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500">
                <Badge
                  variant="outline"
                  className="border-0 bg-white/90 text-red-700 font-semibold"
                >
                  {totalRejected.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                {totalRejected.length}
              </div>
              <p className="text-sm text-gray-600 mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-white via-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
                  <Input
                    placeholder="Search by Sender ID or Client Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-52 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 bg-white/80 backdrop-blur-sm">
                  <Filter className="h-4 w-4 mr-2 text-purple-500" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border-purple-200">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-purple-50/30">
          <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-t-lg">
            <CardTitle className="text-white text-xl font-bold">
              Sender ID Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sender ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Updated Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Purpospe</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests &&
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.name}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {request.clientName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.clientId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(request.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(request.updated_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {/* {request.documents && request.documents.map((doc, index) => ( */}
                          <Badge
                            key={request.id}
                            variant="outline"
                            className="text-xs"
                          >
                            {request.purpose}
                          </Badge>
                          {/* ))} */}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {request.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleStatus(request.id, "approved")
                                }
                                className="text-green-600 hover:bg-green-50"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleStatus(
                                    request.id,
                                    "rejected"
                                  )
                                }
                                className="text-red-600 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
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

export default ManagementSenderIds;
