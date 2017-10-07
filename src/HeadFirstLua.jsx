import React from 'react'
global.WEB = true

// I needed to use require becuase global.WEB = true MUST be issued before the fengari-interop import
//  but if I do it that way and using import an error is thrown by the yarn start (check https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md for more info)
const fengari = require('fengari')
const interop = require('fengari-interop')

const luacode = `
  print ('Lua: initializing lua code')
  js = require "js"
  js.global.foo = function() print("Executed JS function from LUA at " .. os.date("%c", os.time())) end
`

export default class HeadFirstLua extends React.Component {

  componentWillMount() {

    // on will mount, we will initialize fengari and fengario-interop stuff (like initializing the vm)
    const lua = fengari.lua
    const lauxlib = fengari.lauxlib
    const lualib = fengari.lualib
    const L = lauxlib.luaL_newstate()
    /* open standard libraries */
    lualib.luaL_openlibs(L)
    lauxlib.luaL_requiref(L, lua.to_luastring("js"), interop.luaopen_js, 1)
    lua.lua_pop(L, 1) /* remove lib */
    // load code and call the js function created by the lua code
    const ok = lauxlib.luaL_dostring(L, lua.to_luastring(luacode))
    if (ok) return console.log(`Error pcalling: ${ok} ${lua.lua_tojsstring(L, -1)}`)
  }

  handleExecute() {
    // foo is the function created by the lua code
    // inside lua/fengari's code it's setted into global which is a placeholder for the global scope rather web or node
    // as we are on web (not node) we use window.
    // we find the function defined in our global scope and we call it.
    // it will execute the lua code print("WEEE") which will result in a js console log
    window.foo()
  }

  render() {
    return (
      <div>
        <p>The LUA code I will execute is:</p>
        <pre>{luacode}</pre>
        <button onClick={this.handleExecute.bind(this)}>Execute foo()</button>
        <p></p>
        <div>
          Check the browser's console for the output each time you click Execute.
        </div>
      </div>
    )
  }
}