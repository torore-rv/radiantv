import React from 'react';
import Search from "@/components/Search";
import NameChange from "@/components/NameChange";
import NovelList from "@pages/NovelList";

export default function NovelLayout() {
    return (
        <div>
            <Search />
            <NameChange />
            <NovelList />
        </div>
    );
}