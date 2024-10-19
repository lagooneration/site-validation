'use client'
import React from 'react'
import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useSearchParams } from 'next/navigation'


const invoices = [
  {
    invoice: "Chandigarh",
    paymentStatus: "80%",
    totalAmount: "₹2,50,000.00",
    paymentMethod: "2,000",
  },
  {
    invoice: "Delhi",
    paymentStatus: "60%",
    totalAmount: "₹5,50,000.00",
    paymentMethod: "4,500",
  },
  {
    invoice: "Jammu",
    paymentStatus: "70%",
    totalAmount: "₹15,50,000.00",
    paymentMethod: "14,500",
  },
  {
    invoice: "Jalandhar",
    paymentStatus: "75%",
    totalAmount: "₹3,50,000.00",
    paymentMethod: "1,500",
  },
  {
    invoice: "Haryana",
    paymentStatus: "90%",
    totalAmount: "₹8,50,000.00",
    paymentMethod: "7,000",
  },
]


const Settings = () => {
  const searchParams = useSearchParams()
  const propertyName = searchParams.get("propertyName")

  return (
    <div className="flex min-h-screen w-full flex-col">
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
        >
          <Link href="#" className="font-semibold text-primary">
            General
          </Link>
          <Link href="#">Security</Link>
          <Link href="#">Integrations</Link>
          <Link href="#">Support</Link>
          <Link href="#">Organizations</Link>
          <Link href="#">Advanced</Link>
        </nav>
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle>Property Name</CardTitle>
              <CardDescription>
                Used to identify your property to locate latitude and longitude.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => e.preventDefault()}>
                <Input 
                  placeholder="Property Name" 
                  id="propertyName"
                  defaultValue={propertyName || ''}
                />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={() => {
                const input = document.getElementById('propertyName') as HTMLInputElement;
                if (input) {
                  const newPropertyName = input.value;
                  const currentUrl = new URL(window.location.href);
                  currentUrl.searchParams.set('propertyName', newPropertyName);
                  window.history.pushState({}, '', currentUrl.toString());
                  console.log('Property Name updated:', newPropertyName);
                }
              }}>
                Save
              </Button>
            </CardFooter>
          </Card>
          <Table>
          <TableCaption>List of properties for site validation.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Property</TableHead>
              <TableHead>Shadow</TableHead>
              <TableHead>Units</TableHead>
              <TableHead className="text-right">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">₹30,50,000.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        </div>
      </div>
    </main>
  </div>
  )
}

export default Settings