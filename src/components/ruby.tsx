import React from "react"

export type RubyArgs = {
    rt: string;
    children: string;
};
export default function Ruby({rt, children}:RubyArgs) {
    return <ruby>{children}<rp>&nbsp;(</rp><rt>{rt}</rt><rp>)</rp></ruby>
}
