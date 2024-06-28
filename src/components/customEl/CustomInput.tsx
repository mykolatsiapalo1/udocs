import { useEffect } from "react"

import { Box, Input, Typography } from "@mui/joy";

interface CustomInputType {
    type: "text" | "number"
    Name: string
    value: string
    setValue: (e: string) => void
    error: string
    setError: (e: string) => void
    placeholder?: string
}

export default function CustomInput({
    type,
    Name,
    placeholder = "Type here",
    value,
    setValue,
    error,
    setError,
}: CustomInputType) {
    const minValue = 20000

    const handleCheckNumberRange = (value: number) => {
        setError(value < minValue && value > 0 ? `Price must be greater than ${minValue}` : "")
    }
    const handleCheckText = (value: string) => {
        setError(value === "" ? `Field can't be empty` : "")
    }

    const handleOnCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        // Validation for number type input
        if (type === "number") {
            if (inputValue === "") {
                inputValue = "0"
            }
            else if (inputValue.startsWith("0")) {
                inputValue = inputValue.replace(/^0+/, "");
            }
            // Check if the input is a valid number
            if (!/^\d*$/.test(inputValue)) {
                return;
            }
            handleCheckNumberRange(parseInt(inputValue))
        }
        if (type === "text") {
            handleCheckText(inputValue)
        }

        setValue(inputValue);
    }

    useEffect(() => {
        handleCheckNumberRange(parseInt(value))
        handleCheckText(value)
    }, [])

    return (
        <Box>
            <Typography sx={{ pb: "4px" }} level="title-sm">{Name}</Typography>
            <Input
                type={type}
                value={value}
                size="sm"
                placeholder={placeholder}
                sx={{ backgroundColor: "white", borderColor: `${error !== "" && "red"}` }}
                onChange={handleOnCHange} />
            <Typography sx={{ pb: "4px", color: `${error !== "" && "red"}` }} level="body-xs">{error}</Typography>
        </Box >
    );
}
