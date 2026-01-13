"use client"

import { useEffect, useState } from "react"
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "@/lib/api"
import { Employee } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EmployeeForm } from "@/components/employee-form"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees()
      setEmployees(data)
    } catch (error) {
      toast.error("Failed to fetch employees")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (values: any) => {
    try {
      await createEmployee(values)
      toast.success("Employee created successfully")
      setIsDialogOpen(false)
      fetchEmployees()
    } catch (error) {
      toast.error("Failed to create employee")
    }
  }

  const handleUpdate = async (values: any) => {
    if (!currentEmployee?._id) return
    try {
      await updateEmployee(currentEmployee._id, values)
      toast.success("Employee updated successfully")
      setIsDialogOpen(false)
      setCurrentEmployee(null)
      fetchEmployees()
    } catch (error) {
      toast.error("Failed to update employee")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return
    try {
      await deleteEmployee(id)
      toast.success("Employee deleted successfully")
      fetchEmployees()
    } catch (error) {
      toast.error("Failed to delete employee")
    }
  }

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openEditDialog = (employee: Employee) => {
      setCurrentEmployee(employee)
      setIsDialogOpen(true)
  }

  const openCreateDialog = () => {
      setCurrentEmployee(null)
      setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-black/[0.96] p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-500">
              Employee Dashboard
            </h1>
            <p className="text-neutral-400 mt-2">
              Manage your team members and their roles.
            </p>
          </div>
          <Button onClick={openCreateDialog} className="bg-white text-black hover:bg-neutral-200">
            <Plus className="mr-2 h-4 w-4" /> Add Employee
          </Button>
        </div>

        <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                    <span>Overview</span>
                    <div className="relative w-64">
                         <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-500" />
                        <Input
                        placeholder="Search employees..."
                        className="pl-8 bg-neutral-950/50 border-neutral-800 text-neutral-200 focus-visible:ring-neutral-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                <div className="text-center py-10 text-neutral-400">Loading employees...</div>
                ) : (
                <Table>
                    <TableHeader>
                    <TableRow className="border-neutral-800 hover:bg-neutral-900/50">
                        <TableHead className="text-neutral-400">Name</TableHead>
                        <TableHead className="text-neutral-400">Email</TableHead>
                        <TableHead className="text-neutral-400">Position</TableHead>
                        <TableHead className="text-neutral-400">Department</TableHead>
                        <TableHead className="text-neutral-400">Salary</TableHead>
                        <TableHead className="text-right text-neutral-400">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredEmployees.length === 0 ? (
                        <TableRow className="border-neutral-800">
                            <TableCell colSpan={6} className="h-24 text-center text-neutral-500">
                                No employees found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredEmployees.map((employee) => (
                            <TableRow key={employee._id} className="border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                            <TableCell className="font-medium text-neutral-200">{employee.name}</TableCell>
                            <TableCell className="text-neutral-400">{employee.email}</TableCell>
                            <TableCell className="text-neutral-300">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    {employee.position}
                                </span>
                            </TableCell>
                            <TableCell className="text-neutral-300">{employee.department}</TableCell>
                            <TableCell className="text-neutral-300">${Number(employee.salary).toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-neutral-800"
                                    onClick={() => openEditDialog(employee)}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-950/30"
                                    onClick={() => handleDelete(employee._id!)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                </div>
                            </TableCell>
                            </TableRow>
                        ))
                    )}
                    </TableBody>
                </Table>
                )}
            </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-neutral-900 border-neutral-800 text-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{currentEmployee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
              <DialogDescription className="text-neutral-400">
                {currentEmployee ? 'Make changes to the employee profile here.' : 'Enter the details for the new employee.'}
              </DialogDescription>
            </DialogHeader>
            <EmployeeForm
              defaultValues={currentEmployee || undefined}
              onSubmit={currentEmployee ? handleUpdate : handleCreate}
              isLoading={isLoading} // reusing loading state for simplicity, ideally should have isSubmitting
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
