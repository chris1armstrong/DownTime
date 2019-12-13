import React, { Component } from 'react';
import { Card, InputNumber, Input, Select, Statistic } from 'antd';
import './CalcCards.css';

const sizeConversion = {"GB":1000000000,"MB":1000000,"KB":1000};
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
      percentDone: 0,
    };
  }

componentDidUpdate() {
  console.log(this.state);
}

updatePercentage = () => {
  this.setState({
    percentDone: ((this.state.currentSize/this.state.totalSize)*100).toFixed(4)
  });
}

totalSizeUnitsChange = async (value) => {
  let updateVal = this.state.totalSize/sizeConversion[this.state.totalSizeUnits];
  await this.setState({
    totalSizeUnits: value,
    totalSize: updateVal*sizeConversion[value]
  });
  this.updatePercentage();
}

totalSizeChange = async (value) => {
  await this.setState({
    totalSize: value*sizeConversion[this.state.totalSizeUnits]
  });
  this.updatePercentage();
}

currentSizeUnitsChange = async (value) => {
  let updateVal = this.state.currentSize/sizeConversion[this.state.currentSizeUnits];
  await this.setState({
    currentSizeUnits: value,
    currentSize: updateVal*sizeConversion[value],
  });
  this.updatePercentage();
}

currentSizeChange = async (value) => {
  let updateVal = value*sizeConversion[this.state.currentSizeUnits];
  await this.setState({
    currentSize: updateVal,
  });
  this.updatePercentage();
}

getRemaining = () => {
  let totalBytes = this.totalSize*sizeConversion(this.totalSizeUnits);
  let currentBytes = this.currentSize*sizeConversion(this.currentSizeUnits);
  let size = totalBytes - currentBytes;
  let order = "B";
  if (size > sizeConversion("GB")) {
    order = "GB";
  } else if (size > sizeConversion("MB")) {
    order = "MB";
  } else if (size > sizeConversion("KB")) {
    order = "KB";
  }
  return order;
}

render() {
  return (
    <div className="centering">
      <div className="smallContainer">
        <Card title="Download size" size="small">
          <Input.Group compact>
            <InputNumber min={0} defaultValue={0} onChange={this.totalSizeChange}/>
            <Select defaultValue={this.state.totalSizeUnits} onChange={this.totalSizeUnitsChange}>
              <Select.Option value="KB">KB</Select.Option>
              <Select.Option value="MB">MB</Select.Option>
              <Select.Option value="GB">GB</Select.Option>
            </Select>
          </Input.Group>
        </Card>
        <Card title="Currently downloaded/Percent" size="small">
          <Input.Group compact>
            <InputNumber min={0} defaultValue={0} onChange={this.currentSizeChange}/>
            <Select defaultValue={this.state.currentSizeUnits} onChange={this.currentSizeUnitsChange}>
              <Select.Option value="KB">KB</Select.Option>
              <Select.Option value="MB">MB</Select.Option>
              <Select.Option value="GB">GB</Select.Option>
            </Select>
            <div className="percentContainer">
              {this.state.percentDone}%
            </div>
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
            title="Time to finish"
            value={this.state.remainingTime}
          />
        </Card>
        <Card size="small">
          <Statistic
            title={(
              <div>
                Time to fin
                <InputNumber style={{marginRight:'2px',marginLeft:'2px'}} defaultValue={50} min={0} max={100} onChange={(value) => {this.setState({percent:value})}}/>
                %
              </div>)}
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
