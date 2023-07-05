import React from 'react';
import AppBarComponent from '../components/container/AppBarComponent';
import BooksReportContainer from '../components/container/BooksReportContainer';

function ReportData() {
  return (
    <AppBarComponent prop={<BooksReportContainer/>}/>
  );
}

export default ReportData;
