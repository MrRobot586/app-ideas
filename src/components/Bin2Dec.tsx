import React, { useState } from "react";

const Bin2Dec = () => {
    // States
    const [binary, setBinary] = useState("");
    const [decimal, setDecimal] = useState("");
    const [invalidBin, setInvalidBin] = useState(false);
    const [invalidDec, setInvalidDec] = useState(false);

    // Bin input handler
    const handleChangeBinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const binValue = e.target.value;
        const decValue = binValue.length ? bin2dec(binValue).toString() : "";

        setBinary(binValue);

        if (!isBin(binValue)) return setInvalidBin(true);
        setInvalidBin(false);
        setDecimal(decValue);
    };

    // Dec input handler
    const handleChangeDecInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const decValue = e.target.value;
        const binValue = decValue.length
            ? dec2bin(parseInt(decValue)).toString()
            : "";

        setDecimal(decValue);

        if (!isDec(decValue)) return setInvalidDec(true);
        setInvalidDec(false);
        setBinary(binValue);
    };

    const isBin = (binVal: string): boolean => {
        return binVal.match(/^[0-1]+$/) != null || binVal === "";
    };

    const isDec = (binVal: string): boolean => {
        return binVal.match(/^[0-9]+$/) != null || binVal === "";
    };

    // Bin to Dec conversion function
    const bin2dec = (bin: string): number => {
        if (bin === "") return 0;

        const dec = bin
            .split("") // Split the string into an array
            .map(Number) // Convert each element to a number
            .reverse() // Reverse the array
            .reduce((acc, curr, i) => {
                return acc + curr * Math.pow(2, i); // Multiply the current number by 2 raised to the power of the index
            });

        return dec; // Return the decimal
    };

    // Dec to bin conversion function
    const dec2bin = (dec: number) => dec.toString(2);

    // Copy to clipboard
    const copyToClipboard = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (!(decimal || binary)) return;
        if (!isBin(binary) || !isDec(decimal)) return;

        const clipboard = navigator.clipboard;
        const name = e.target.name;

        name === "Copy binary"
            ? clipboard.writeText(binary)
            : clipboard.writeText(decimal);

        alert("Copied to clipboard!");
    };
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="m-3 p-3 rounded">
                <h1 className="text-center mb-3">Binary conversor</h1>
                <div className="row">
                    <div className="col">
                        <label htmlFor="Binary" className="form-label">
                            Binary number
                        </label>
                        <div className="input-group">
                            <input
                                type="text"
                                className={`form-control ${
                                    invalidBin && "is-invalid"
                                }`}
                                id="Binary"
                                placeholder="010101..."
                                value={binary}
                                onChange={handleChangeBinInput}
                            />

                            <button
                                className="btn btn-outline-secondary"
                                name="Copy binary"
                                onClick={copyToClipboard}
                            >
                                copy
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <label htmlFor="Decimal" className="form-label">
                            Decimal equivalent
                        </label>
                        <div className="input-group">
                            <input
                                type="text"
                                className={`form-control ${
                                    invalidDec && "is-invalid"
                                }`}
                                id="Decimal"
                                placeholder="53..."
                                value={decimal}
                                onChange={handleChangeDecInput}
                            />

                            <button
                                className="btn btn-outline-secondary"
                                name="Copy decimal"
                                onClick={copyToClipboard}
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bin2Dec;
