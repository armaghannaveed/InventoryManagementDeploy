import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import AboutMe from './Aboutme';
import Form from './form';
import { deleteItem, deleteAllItems } from './actions';

function App({ deleteItem, deleteAllItems }) {
  return (
    <Router>
      <div>
        <>
          <Routes>
            <Route path="/" element={<AboutMe />} />
            <Route
              path="/form"
              element={<Form deleteItem={deleteItem} deleteAllItems={deleteAllItems} />}
            />
          </Routes>
        </>
      </div>
    </Router>
  );
}

const mapDispatchToProps = {
  deleteItem,
  deleteAllItems,
};

export default connect(null, mapDispatchToProps)(App);
