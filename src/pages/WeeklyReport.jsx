import React from 'react';
import WeeklyReportContainer from '../components/container/WeeklyReportContainer';
import AppBarComponent from '../components/container/AppBarComponent';

function WeeklyReport() {
  return (
    <div>
      <AppBarComponent prop={<WeeklyReportContainer/>}/>
      
    </div>
  );
}

export default WeeklyReport;
