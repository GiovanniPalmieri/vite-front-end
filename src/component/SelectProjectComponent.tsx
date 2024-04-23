import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export interface SelectComponentProps {
    items: { value: string, view: string }[]
    onSelection: (e: SelectChangeEvent<string>) => void;
    selectionHint: string
    defaultValue: string
    defaultLabel: string
}

export default function SelectProjectComponent({ items, onSelection , selectionHint , defaultValue, defaultLabel}: SelectComponentProps) {

    const [label, setLabel] = useState(defaultLabel)
    const [value, setValue] = useState(defaultValue)

    return (
        <FormControl variant="standard" size="small" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>{selectionHint}</InputLabel>
            <Select label={label} value={value}
                onChange={e => {onSelection(e);setLabel(e.target.name);setValue(e.target.value)}}>
                <MenuItem value="None">
                    <em>None</em>
                </MenuItem>
                {items.map(i => <MenuItem key={i.value} value={i.value}>{i.view}</MenuItem>)}
            </Select>
        </FormControl>
    );
}