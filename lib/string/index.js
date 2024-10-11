

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const isValidEmailAddress = (email="") => {
    return EMAIL_REGEX.test(email);
}

export const convertReturnsToHTML = (text) => {
    const returnNRegex = /(\n)/ig;
    return `<p>${text.replace(returnNRegex, "<br />")}</p>`;
};

export const charLimit = (text, maxLength, isHTML) => {
    if ((text || "").length > maxLength) {
        if(!isHTML) {
            return `${text.substring(0, maxLength - 1)}…`;
        }

        // isHTML
        let mention = text.indexOf("class=\"mention\"");
        let totalMaxLength = maxLength;
        if(mention > -1 && mention < maxLength) {
            // there is a mention in the first 200 characters, add more to get past the crazy HTML
            totalMaxLength = maxLength + 275;
        }

        // Return all if it's less than max
        if(totalMaxLength >= text.length) {
            return text;
        }

        // If there's not a </p> tag, just return the max
        let pIndex = text.indexOf("</p>");
        if(pIndex < 0) {
            return `${text.substring(0, totalMaxLength - 1)}…`;
        }

        // Loop through looking for all </p> and stop once it's past totalMaxLength
        let lastIndex = pIndex;
        while(lastIndex < totalMaxLength ) {
            pIndex = text.substring(lastIndex+5).indexOf("</p>");
            if(pIndex < 0) {
                // No more matches
                break;
            }

            // Update the last index
            lastIndex = lastIndex + 5 + pIndex;
        }

        if(lastIndex > totalMaxLength + 20) {
            return `${text.substring(0, totalMaxLength - 1)}…</p>`;
        } else {
            return `${text.substring(0, lastIndex)}…</p>`;
        }
    }

    return text;
}

export const shortenFilename = (filename, maxLength) => {
    if(!filename) {
        return "";
    }
    const parts = filename.split(".");
    const shortened = charLimit(parts[0], maxLength-4, false);
    return `${shortened}.${parts[1]}`;
}


const PHONE_REGEX = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
export const isValidPhoneNumber = (phone = "") => {
    return PHONE_REGEX.test(phone);
}
export const formatPhoneNumber = (phone = "") => {
    //normalize string and remove all unnecessary characters
    const cleanNumber = phone.replace(/[^\d]/g, "");

    //reformat and return phone number
    if (cleanNumber.length > 6) {
        return cleanNumber.replace(/(\d{3})(\d{3})(\d{1,})/, "($1) $2-$3");
    } else if (cleanNumber.length > 3) {
        return cleanNumber.replace(/(\d{3})(\d{1,})/, "($1) $2");
    } else {
        return cleanNumber.replace(/(\d{1,})/g, "($1");
    }
}
