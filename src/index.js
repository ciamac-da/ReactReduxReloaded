
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import Button from '@material-ui/core/Button';
/*
  Der Reducer verwaltet den [state]
    - Gibt es noch keinen state kann er sich einen ausdenken :)
    - Er bekommen Nachrichten, sogenannte Actions
      und gibt den neuen state zurück.
*/

function reducer( state = { ok:0, hmm: 0, so: 0 }, action ){
  if ( action.type === 'increment' ){
    state = { ...state, ok: state.ok + 1 }
  }
  return state;
}

/*
  Die [mapActionsToProps] stellt der verbundenen Komponente
    einfache Funktionen zur verfügung um Nachrichten an den reducer
    schicken.
*/

function mapActionsToProps( dispatch ){
  return {
    increment: function(){ dispatch({ type:'increment' }) }
  };
}

/*
  mapStateToProps mach aus unserem State die Props die
    durch den adapter an die verbundenen (connect) Komponenten
    weitergegeben werden.
*/

function mapStateToProps( { ok } ){
  return { ok };
}

/*
  Der adapter ist eine Funktion die mit der [connect] Funtion erzeugt wird
    - als erstes argument nimmt connect  eine [mapStateToProps] Funtion an
*/
const adapter = connect(
  mapStateToProps,
  mapActionsToProps
);

/*
  Die [App] Komponente ist erstmal nicht verbunden, d.h. sie bekommt keine
    Props aus dem state ohne das wir den adapter benutzen.
*/

function App({ok,increment}){
  return <>
  <Button 
  variant="contained" 
  color="secondary"
  onClick={increment}
  >
        Ok!: {ok}
      </Button>
  </>;
}

/*
  Deswegen erzeigen wir eine neue Komponente mit dme [adapter]
*/

const ConnectedApp = adapter(App);

/*
  Die [createStore] Funktion erzuegt aus einem reducer
    einen store den man mit der Provider Komponente an alle
    [children] weitergeben kann.
*/

const store = createStore(reducer);

/*
  Provider nimmt den [store] und stellt ihn allen [children] zur verügung
*/

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp/>
  </Provider>
, document.getElementById('root'));
