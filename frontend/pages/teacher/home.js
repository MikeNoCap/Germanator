import Head from 'next/head'
import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import Dashboard from '../../components/teacher/dashboard';


export default function TeacherHome() {
    return (
        <div>
            <Dashboard />
        </div>
    )
}