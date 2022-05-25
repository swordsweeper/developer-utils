export function convertCentsToDollars(cents) {
    return Math.abs(cents / 100);
}
export function convertDollarsToCents(dollars) {
    return Math.round(dollars * 100);
}

export function formatDollarsFromCents(cents) {
    return `$${convertCentsToDollars(cents).toFixed(2)}`;
}

export function formatDollarsToCents(dollars) {
    return `$${convertDollarsToCents(dollars)}`;
}

export function formatUSD(value, { useCents, useCommas } = { useCents: true, useCommas: true }) {
    const newValue = useCents ? value.toFixed(2) : value;
    if(useCommas) {
        return `$${addCommasToNumber(newValue)}`
    }
    return `$${newValue}`;
}

export function formatCurrencyString(value) {
    if(!value) {
        return value;
    }

    return value.toFixed(2);
}

export function addCommasToNumber(toConvert) {
    if (toConvert) {
        const numberValue = typeof (toConvert) === "string" ? toConvert : toConvert.toString()
        if (numberValue.includes(".")) {
            const parts = numberValue.split(".")
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            parts[1] = parts[1].substr(0, 2) // Essentially toFixed(2)
            return parts.join(".")
        }
        return numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
        return 0;
    }
}

export function valueToNumber(value, nanValue = 0) {
    const asNumber = Number(value);
    return isNaN(asNumber) ? nanValue : asNumber;
}

export function hasValue(value) {
    if(!value) {
        return value === 0;
    }
    return true;
}

export const convertStripePrice = (price) => {
    return`$${Math.abs(price / 100).toFixed(2)}`
}

export const convertStripeDecimal = (price) => {
    return Math.abs(price / 100).toFixed(2)
}
