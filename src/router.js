import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './Components/Login'
import Register from './Components/Register'
import Items from './Components/Items'
import Lists from './Components/Lists'
import Trips from './Components/Trips'
import Home from './Components/Home'


export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/items' component={Items}/>
        <Route path='/lists' component={Lists}/>
        <Route path='/trips' component={Trips}/>
    </Switch>
)