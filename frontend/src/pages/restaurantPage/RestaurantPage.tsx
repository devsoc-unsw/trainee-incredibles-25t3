import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"

export default function RestaurantPage() {
    return (

        <Card className = "w-[90%] max-w-[400px] mx-auto bg-white rounded-[30px]">
            <CardHeader className = "flex flex-col gap-4">
                <div className = "flex items-center justify-between">
                    <CardTitle className = "text-2xl font-bold"> Yallah Eats </CardTitle>
                    <div className = "text-yellow-400 text-xl"> ★★★★☆ </div>
                </div>
            </CardHeader>

            <CardContent className = "flex flex-col gap-6">
                <img
                    src = "/yallah-eats.jpeg"
                    alt = "Food"
                    className = "w-full h-[220px] object-cover rounded-30px border-[6px] border-orange-300"
                />
                
                <h2 className="text-xl font-semibold">Menu</h2>


                <Button className="w-full py-4 text-2xl font-semibold bg-gradient-to-r from-yellow-300 to-orange-400 rounded-[30px]">
                Location
                </Button>

                <Button className="w-full py-4 text-2xl font-semibold bg-gradient-to-r from-yellow-300 to-orange-400 rounded-[30px]">
                Menu
                </Button>

                <Button className="w-full py-4 text-2xl font-semibold bg-gradient-to-r from-yellow-300 to-orange-400 rounded-[30px]">
                Contact
                </Button>

                <Button className="w-full py-4 text-2xl font-semibold bg-gradient-to-r from-yellow-300 to-orange-400 rounded-[30px]">
                Order
                </Button>
            
            </CardContent>
        </Card>
    )
}
