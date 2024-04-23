import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

export interface SelectComponentProps {
    items: { value: string, view: string }[]
    onSelection: (e: SelectChangeEvent<string>) => void;
    selectionHint: string
}

export default function SelectProjectComponent({ items, onSelection , selectionHint }: SelectComponentProps) {
    return (
        <FormControl variant="standard" size="small">
            <InputLabel>{selectionHint}</InputLabel>
            <Select label="" value=''
                onChange={e => onSelection(e)}>
                <MenuItem value="None">
                    <em>None</em>
                </MenuItem>
                {items.map(i => <MenuItem key={i.value} value={i.value}>{i.view}</MenuItem>)}
            </Select>
        </FormControl>
    );
}