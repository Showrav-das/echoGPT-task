"use client";

import { zodResolver } from "@hookform/resolvers/zod";
// import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const FormSchema = z.object({
    time: z.date({
        required_error: "A date and time is required.",
    }),
});

export function DateTimePickerForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });


    const now = new Date();
    const currentHour = now.getHours(); // 0-23
    const currentMinute = now.getMinutes();
    const isPm = currentHour >= 12;
    const selectedDate = form.watch("time") || now;

    const isToday =
        now.toDateString() === selectedDate.toDateString();

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast.success(`Selected date and time: ${format(data.time, "PPPPpppp")}`);
    }

    function handleDateSelect(date: Date | undefined) {
        if (date) {
            form.setValue("time", date);
        }
    }

    function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
        const currentDate = form.getValues("time") || new Date();
        let newDate = new Date(currentDate);

        if (type === "hour") {
            const hour = parseInt(value, 10);
            newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
        } else if (type === "minute") {
            newDate.setMinutes(parseInt(value, 10));
        } else if (type === "ampm") {
            const hours = newDate.getHours();
            if (value === "AM" && hours >= 12) {
                newDate.setHours(hours - 12);
            } else if (value === "PM" && hours < 12) {
                newDate.setHours(hours + 12);
            }
        }

        form.setValue("time", newDate);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Enter your date & time (12h)</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "MM/dd/yyyy hh:mm aa")
                                            ) : (
                                                <span>MM/DD/YYYY hh:mm aa</span>
                                            )}
                                            {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <div className="sm:flex">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={handleDateSelect}
                                            initialFocus
                                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}

                                        />
                                        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                                            <ScrollArea className="w-64 sm:w-auto">
                                                <div className="flex sm:flex-col p-2">
                                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => {
                                                        const hour24 =
                                                            hour === 12 ? (selectedDate.getHours() >= 12 ? 12 : 0) : hour + (selectedDate.getHours() >= 12 ? 12 : 0);

                                                        const isSelected =
                                                            selectedDate.getHours() % 12 === hour % 12;

                                                        const isDisabled =
                                                            isToday && hour24 < currentHour;

                                                        return (
                                                            <Button
                                                                key={hour}
                                                                size="icon"
                                                                variant={isSelected ? "default" : "ghost"}
                                                                className="sm:w-full shrink-0 aspect-square"
                                                                onClick={() => handleTimeChange("hour", hour.toString())}
                                                                disabled={isDisabled}
                                                            >
                                                                {hour}
                                                            </Button>
                                                        );
                                                    })}

                                                </div>
                                                <ScrollBar
                                                    orientation="horizontal"
                                                    className="sm:hidden"
                                                />
                                            </ScrollArea>
                                            <ScrollArea className="w-64 sm:w-auto">
                                                <div className="flex sm:flex-col p-2">
                                                    {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => {
                                                        const isSelected = selectedDate.getMinutes() === minute;
                                                        const selectedHour = selectedDate.getHours();

                                                        const isDisabled =
                                                            isToday &&
                                                            selectedHour === currentHour &&
                                                            minute <= currentMinute;

                                                        return (
                                                            <Button
                                                                key={minute}
                                                                size="icon"
                                                                variant={isSelected ? "default" : "ghost"}
                                                                className="sm:w-full shrink-0 aspect-square"
                                                                onClick={() => handleTimeChange("minute", minute.toString())}
                                                                disabled={isDisabled}
                                                            >
                                                                {minute.toString().padStart(2, "0")}
                                                            </Button>
                                                        );
                                                    })}

                                                </div>
                                                <ScrollBar
                                                    orientation="horizontal"
                                                    className="sm:hidden"
                                                />
                                            </ScrollArea>
                                            <ScrollArea className="">
                                                <div className="flex sm:flex-col p-2">
                                                    {["AM", "PM"].map((ampm) => {
                                                        const isSelected =
                                                            (ampm === "AM" && selectedDate.getHours() < 12) ||
                                                            (ampm === "PM" && selectedDate.getHours() >= 12);

                                                        const isDisabled = isToday && ampm === "AM" && now.getHours() >= 12;

                                                        return (
                                                            <Button
                                                                key={ampm}
                                                                size="icon"
                                                                variant={isSelected ? "default" : "ghost"}
                                                                className="sm:w-full shrink-0 aspect-square"
                                                                onClick={() => handleTimeChange("ampm", ampm)}
                                                                disabled={isDisabled}
                                                            >
                                                                {ampm}
                                                            </Button>
                                                        );
                                                    })}

                                                </div>
                                            </ScrollArea>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Please select your preferred date and time.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}




// second timer example

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { format, isToday as isTodayFn, startOfToday } from "date-fns";
// import { useMemo } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { toast } from "sonner";

// const FormSchema = z.object({
//     // time: z.date({
//     //     required_error: "A date and time is required.",
//     // }),
//     time: z.date({
//         required_error: "A date and time is required.",
//     }),
// }).refine((data) => data.time > new Date(), {
//     message: "Date and time must be in the future.",
//     path: ["time"],
// });


// function getRoundedFutureTime(stepMinutes: number, offsetMinutes: number): Date {
//     const now = new Date();
//     const future = new Date(now.getTime() + offsetMinutes * 60 * 1000);
//     const minutes = future.getMinutes();
//     const roundedMinutes = Math.ceil(minutes / stepMinutes) * stepMinutes;
//     future.setMinutes(roundedMinutes);
//     future.setSeconds(0);
//     future.setMilliseconds(0);
//     return future;
// }

// const defaultTime = getRoundedFutureTime(5, 15);

// export function DateTimePickerForm() {
//     const form = useForm<z.infer<typeof FormSchema>>({
//         resolver: zodResolver(FormSchema),
//         defaultValues: {
//             time: defaultTime
//         }
//     });

//     const now = new Date();
//     const currentHour = now.getHours();
//     const currentMinute = now.getMinutes();
//     const selectedDate = form.watch("time") || now;

//     const isToday = useMemo(() => isTodayFn(selectedDate), [selectedDate]);
//     const selectedHour = selectedDate.getHours();
//     const selectedHour12 = selectedHour % 12 || 12;

//     function onSubmit(data: z.infer<typeof FormSchema>) {
//         toast.success(`Selected date and time: ${format(data.time, "PPPPpppp")}`);
//     }

//     function handleDateSelect(date: Date | undefined) {
//         if (date) {
//             form.setValue("time", date);
//         }
//     }

//     function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
//         const currentDate = form.getValues("time") || new Date();
//         const newDate = new Date(currentDate);

//         if (type === "hour") {
//             const hour = parseInt(value, 10);
//             const isPM = newDate.getHours() >= 12;
//             newDate.setHours(hour % 12 + (isPM ? 12 : 0));
//         }

//         if (type === "minute") {
//             newDate.setMinutes(parseInt(value, 10));
//         }

//         if (type === "ampm") {
//             const hour = newDate.getHours();
//             const isCurrentlyPM = hour >= 12;
//             if (value === "AM" && isCurrentlyPM) newDate.setHours(hour - 12);
//             if (value === "PM" && !isCurrentlyPM) newDate.setHours(hour + 12);
//         }

//         form.setValue("time", newDate);
//     }

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//                 <FormField
//                     control={form.control}
//                     name="time"
//                     render={({ field }) => (
//                         <FormItem className="flex flex-col">
//                             <FormLabel>Enter your date & time (12h)</FormLabel>
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <FormControl>
//                                         <Button
//                                             variant={"outline"}
//                                             className={cn(
//                                                 "w-full pl-3 text-left font-normal",
//                                                 !field.value && "text-muted-foreground"
//                                             )}
//                                         >
//                                             {field.value
//                                                 ? format(field.value, "MM/dd/yyyy hh:mm aa")
//                                                 : "MM/DD/YYYY hh:mm aa"}
//                                         </Button>
//                                     </FormControl>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-auto p-0">
//                                     <div className="sm:flex">
//                                         <Calendar
//                                             mode="single"
//                                             selected={field.value}
//                                             onSelect={handleDateSelect}
//                                             initialFocus
//                                             disabled={(date) =>
//                                                 date < startOfToday()
//                                             }
//                                         />
//                                         <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
//                                             {/* Hour Picker */}
//                                             <ScrollArea className="w-64 sm:w-auto">
//                                                 <div className="flex sm:flex-col p-2">
//                                                     {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => {
//                                                         const hour24 = hour % 12 + (selectedHour >= 12 ? 12 : 0);
//                                                         const isSelected = selectedHour12 === hour;
//                                                         const isDisabled = isToday && hour24 < currentHour;

//                                                         return (
//                                                             <Button
//                                                                 key={hour}
//                                                                 size="icon"
//                                                                 variant={isSelected ? "default" : "ghost"}
//                                                                 className="sm:w-full shrink-0 aspect-square"
//                                                                 onClick={() => handleTimeChange("hour", hour.toString())}
//                                                                 disabled={isDisabled}
//                                                             >
//                                                                 {hour}
//                                                             </Button>
//                                                         );
//                                                     })}
//                                                 </div>
//                                                 <ScrollBar orientation="horizontal" className="sm:hidden" />
//                                             </ScrollArea>

//                                             {/* Minute Picker */}
//                                             <ScrollArea className="w-64 sm:w-auto">
//                                                 <div className="flex sm:flex-col p-2">
//                                                     {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => {
//                                                         const isSelected = selectedDate.getMinutes() === minute;
//                                                         const isDisabled =
//                                                             isToday &&
//                                                             selectedHour === currentHour &&
//                                                             minute <= currentMinute;

//                                                         return (
//                                                             <Button
//                                                                 key={minute}
//                                                                 size="icon"
//                                                                 variant={isSelected ? "default" : "ghost"}
//                                                                 className="sm:w-full shrink-0 aspect-square"
//                                                                 onClick={() =>
//                                                                     handleTimeChange("minute", minute.toString())
//                                                                 }
//                                                                 disabled={isDisabled}
//                                                             >
//                                                                 {minute.toString().padStart(2, "0")}
//                                                             </Button>
//                                                         );
//                                                     })}
//                                                 </div>
//                                                 <ScrollBar orientation="horizontal" className="sm:hidden" />
//                                             </ScrollArea>

//                                             {/* AM/PM Picker */}
//                                             <ScrollArea>
//                                                 <div className="flex sm:flex-col p-2">
//                                                     {["AM", "PM"].map((ampm) => {
//                                                         const isSelected =
//                                                             (ampm === "AM" && selectedHour < 12) ||
//                                                             (ampm === "PM" && selectedHour >= 12);

//                                                         const isDisabled =
//                                                             isToday && ampm === "AM" && currentHour >= 12;

//                                                         return (
//                                                             <Button
//                                                                 key={ampm}
//                                                                 size="icon"
//                                                                 variant={isSelected ? "default" : "ghost"}
//                                                                 className="sm:w-full shrink-0 aspect-square"
//                                                                 onClick={() => handleTimeChange("ampm", ampm)}
//                                                                 disabled={isDisabled}
//                                                             >
//                                                                 {ampm}
//                                                             </Button>
//                                                         );
//                                                     })}
//                                                 </div>
//                                             </ScrollArea>
//                                         </div>
//                                     </div>
//                                 </PopoverContent>
//                             </Popover>
//                             <FormDescription>
//                                 Please select your preferred date and time.
//                             </FormDescription>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <Button type="submit">Submit</Button>
//             </form>
//         </Form>
//     );
// }
