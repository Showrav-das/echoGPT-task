'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function EmailSelector() {
    const [inputEmail, setInputEmail] = useState("")
    const [activeCheckboxEmail, setActiveCheckboxEmail] = useState("")
    const [checked, setChecked] = useState(false)
    const [selectedEmails, setSelectedEmails] = useState<string[]>([])

    // Load default test email
    useEffect(() => {
        const defaultEmail = "test@gmail.com"
        setSelectedEmails([defaultEmail])
        setActiveCheckboxEmail(defaultEmail)
        setChecked(true)
    }, [])

    const handleAddEmail = () => {
        if (!inputEmail.trim()) return
        if (selectedEmails.includes(inputEmail)) return

        setActiveCheckboxEmail(inputEmail)
        setChecked(false)
        setInputEmail("")
    }

    const handleCheckboxChange = (value: boolean) => {
        setChecked(value)

        if (value && activeCheckboxEmail && !selectedEmails.includes(activeCheckboxEmail)) {
            setSelectedEmails((prev) => [...prev, activeCheckboxEmail])
        } else if (!value && activeCheckboxEmail !== "test@gmail.com") {
            setSelectedEmails((prev) => prev.filter((e) => e !== activeCheckboxEmail))
        }
    }

    const removeEmail = (emailToRemove: string) => {
        if (emailToRemove === "test@gmail.com") return // Don't allow removing test email
        setSelectedEmails((prev) => prev.filter((e) => e !== emailToRemove))
        if (emailToRemove === activeCheckboxEmail) {
            setChecked(false)
        }
    }

    return (
        <div className="max-w-md mx-auto space-y-4 mt-10">
            <Label htmlFor="email">Search Email</Label>
            <div className="flex gap-2">
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                />
                <Button onClick={handleAddEmail}>Add</Button>
            </div>

            {activeCheckboxEmail && (
                <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                        id="select-email"
                        checked={checked}
                        disabled={activeCheckboxEmail === "test@gmail.com"}
                        onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="select-email">{activeCheckboxEmail}</Label>
                </div>
            )}

            <div className="flex flex-wrap gap-2 pt-4">
                {selectedEmails.map((e) => (
                    <Badge key={e} variant="default" className="flex items-center gap-1">
                        {e}
                        {e !== "test@gmail.com" && (
                            <button className="ml-1" onClick={() => removeEmail(e)}>
                                <X className="h-3 w-3" />
                            </button>
                        )}
                    </Badge>
                ))}
            </div>
        </div>
    )
}
