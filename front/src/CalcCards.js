import React, { Component } from 'react';
import { Card, InputNumber, Input, Select, Statistic } from 'antd';
import './CalcCards.css';

//const sizeConversion = [{"GB":1000000},{"MB":1000},{"KB":1}];
//const timeConversion = [{"hrs":3600},{"mins":60},{"secs":1}];

class CalcCards extends Component{
  constructor(props) {
    super(props);
    this.state = {
      totalSize: 0,
      totalSizeUnits: "GB",
      currentSize: 0,
      currentSizeUnits: "GB",
      speed: 0,
      speedUnits: "KB/s",
      time: 0,
      timeUnits: "hrs",
      end: "N/A",
      remainingSize: "N/A",
      remainingTime: "N/A",
      remainingPerTime: "N/A",
      percent: 50,
    };
  }

totalSizeUnitsChange = (value) => {
  this.setState({
    totalSizeUnits: value
  })
}

currentSizeUnitsChange = (value) => {
  this.setState({
    currentSizeUnits: value
  })
}

render() {
  const biggus = (
    <div>
      Time to fin
      <InputNumber defaultValue={50} min={0} max={100} onChange={(value) => {this.setState({percent:value})}}/>
      %
    </div>);
  return (
    <div className="centering">
      <div className="smallContainer">
        <Card title="Download size" size="small">
          <Input.Group compact>
            <InputNumber min={0} defaultValue={0} onChange={(value) => {this.setState({totalSize:value})}}/>
            <Select defaultValue={this.state.totalSizeUnits} onChange={this.totalSizeUnitsChange}>
              <Select.Option value="KB">KB</Select.Option>
              <Select.Option value="MB">MB</Select.Option>
              <Select.Option value="GB">GB</Select.Option>
            </Select>
          </Input.Group>
        </Card>
        <Card title="Currently downloaded/Percent" size="small">
          <Input.Group compact>
            <InputNumber min={0} defaultValue={0} onChange={(value) => {this.setState({currentSize:value})}}/>
            <Select defaultValue={this.state.currentSizeUnits} onChange={this.currentSizeUnitsChange}>
              <Select.Option value="KB">KB</Select.Option>
              <Select.Option value="MB">MB</Select.Option>
              <Select.Option value="GB">GB</Select.Option>
            </Select>
          </Input.Group>
        </Card>
        <Card title="Speed" size="small">
          <Input.Group compact>
            <InputNumber min={0} defaultValue={0} onChange={(value) => {this.setState({speed:value})}}/>
            <Select defaultValue={this.state.speedUnits} onChange={this.speedUnitsChange}>
              <Select.Option value="KB">KB/s</Select.Option>
              <Select.Option value="MB">MB/s</Select.Option>
            </Select>
          </Input.Group>
        </Card>
      </div>
      <div className="smallContainer">
        <Card size="small">
          <Statistic
            title="Remaining/Percent"
            value={this.state.remainingSize}
          />
        </Card>
        <Card size="small">
          <Statistic
            title="Time to Fin"
            value={this.state.remainingTime}
          />
        </Card>
        <Card size="small">
          <Statistic
            title={biggus}
            value={this.state.remainingPerTime}
          />
        </Card>
      </div>
      <div className="footContainer">
        <Card>
          In the next 
          <Input.Group compact>
            <InputNumber min={0} defaultValue={0} onChange={(value) => {this.setState({timeSize:value})}}/>
            <Select defaultValue={this.state.timeUnits} onChange={this.timeUnitsChange}>
              <Select.Option value="hrs">hrs</Select.Option>
              <Select.Option value="mins">mins</Select.Option>
              <Select.Option value="secs">secs</Select.Option>
            </Select>
          </Input.Group> 
          I can download
          <br/>
          {this.state.end}
        </Card>
      </div>
    </div>
    )
  }
}

export default CalcCards;
