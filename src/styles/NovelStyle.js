import React from "react";
import ScrollToTop from "@/styles/ScrollToTop";
import MessageBox from "@/styles/MessageBox";
import GhostBox from "@/styles/GhostBox";

export function textToHTML(text) {
    ScrollToTop();

    return text.split('\n').map((str, index) => {
        if (str.includes('[[messageBox:')) {
            const matchResult = str.match(/\[\[messageBox:(.*?)\]\]/);
            const message = matchResult && matchResult[1];
            if (message) {
                return <MessageBox key={index}>{message}</MessageBox>;
            }
        }
        if (str.includes('[[ghostBox:')) {
            const matchResult = str.match(/\[\[ghostBox:(.*?)\]\]/);
            const ghost = matchResult && matchResult[1];
            if (ghost) {
                return <GhostBox key={index}>{ghost}</GhostBox>;
            }
        }

        const formattedStr = str.replace(/ /g, '\u00A0');
        return (
            <React.Fragment key={index}>
                {formattedStr}{index !== text.split('\n').length - 1 && <br />}
            </React.Fragment>
        );
    });
}