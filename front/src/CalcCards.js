import React, { Component } from 'react';
import { Card } from 'antd';
import './CalcCards.css';
      
class CalcCards extends Component{

render() {
  return (
    <div className="centering">
      <div className="smallContainer">
        <Card title="Download size" size="small">
        </Card>
        <Card title="Currently downloaded/Percent" size="small">
        </Card>
        <Card title="Speed" size="small">
        </Card>
      </div>
      <div className="smallContainer">
        <Card title="Remaining/Percent" size="small">
        </Card>
        <Card title="Time to Fin (hrs)" size="small">
        </Card>
        <Card title="Time to Fin x% (hrs)" size="small">
        </Card>
      </div>
      <div className="footContainer">
        <Card>
            In the next x(units) I can download y MBs
        </Card>
      </div>
    </div>
    )
  }
}

export default CalcCards;
