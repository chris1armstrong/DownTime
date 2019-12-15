import React, { Component } from 'react';
import { Card, InputNumber, Input, Select, Statistic } from 'antd';
import './CalcCards.css';

const sizeConversion = {"GB":1000000000,"MB":1000000,"KB":1000}; //to Bytes
const timeConversion = {"hrs":3600,"mins":60,"secs":1}; //to seconds
const speedConversion = {"KB/s":1000,"MB/s":1000000}; //to Bytes/s

class CalcCards extends Component{
  constructor(props) {
    super(props);
    this.state = {
      totalSize: 0,           //Bytes
      totalSizeUnits: "GB",   //Current units
      currentSize: 0,         //Bytes
      currentSizeUnits: "GB", //Current units
      speed: 0,               //B/s
      speedUnits: "KB/s",     //Current units
      remainingSize: 0,   //Bytes
      remainingTime: "N/A",   //Seconds
      remainingPerTime: "N/A",//Bytes
      percent: 50,            //[0-100]
      percentDone: 0,         //Calced
      percentRemaining: 0,    //Calced
      time: 0,                //Seconds
      timeUnits: "hrs",       //Current units
      end: "N/A",             //Bytes
    };
  }
/*
componentDidUpdate() {
  console.log(this.state);
}*/

updatePercentage = () => {
  let perDone = ((this.state.currentSize/this.state.totalSize)*100).toFixed(2);
  let perRemain = 100 - perDone;
  let sizeRemain = this.state.totalSize-this.state.currentSize;
  this.setState({
    percentDone: perDone,
    remainingSize: sizeRemain,
    percentRemaining: perRemain,
  });
}

totalSizeUnitsChange = async (value) => {
  let updateVal = this.state.totalSize/sizeConversion[this.state.totalSizeUnits];
  await this.setState({
    totalSizeUnits: value,
    totalSize: updateVal*sizeConversion[value]
  });
  this.updatePercentage();
  this.updateTimes();
}

totalSizeChange = async (value) => {
  await this.setState({
    totalSize: value*sizeConversion[this.state.totalSizeUnits]
  });
  this.updatePercentage();
  this.updateTimes();
}

currentSizeUnitsChange = async (value) => {
  let updateVal = this.state.currentSize/sizeConversion[this.state.currentSizeUnits];
  await this.setState({
    currentSizeUnits: value,
    currentSize: updateVal*sizeConversion[value],
  });
  this.updatePercentage();
  this.updateTimes();
}

currentSizeChange = async (value) => {
  let updateVal = value*sizeConversion[this.state.currentSizeUnits];
  await this.setState({
    currentSize: updateVal,
  });
  this.updatePercentage();
  this.updateTimes();
}

getRemaining = () => {
  let size = this.state.remainingSize;
  let order = "B";
  if (size > sizeConversion["GB"]) {
    size = size/sizeConversion["GB"];
    order = "GB";
  } else if (size > sizeConversion["MB"]) {
    size = size/sizeConversion["MB"];
    order = "MB";
  } else if (size > sizeConversion["KB"]) {
    size = size/sizeConversion["KB"];
    order = "KB";
  }
  return size.toFixed(2) + order + " " + this.state.percentRemaining.toFixed(2) + "%";
}

updateTimes = () => {
  let time = this.state.remainingSize/this.state.speed; //Seconds remaining at current speed
  let hours = Math.floor(time/timeConversion["hrs"]);
  time = time%timeConversion["hrs"];
  let minutes = Math.floor(time/timeConversion["mins"]);
  let seconds = (time%timeConversion["mins"]).toFixed(0);
  this.setState({
    remainingTime: hours + "hrs " + minutes + "mins " + seconds + "secs"
  });
}

speedChange = async (value) => {
  await this.setState({
    speed: value*speedConversion[this.state.speedUnits]
  });
  this.updateTimes();
}

speedUnitsChange = async (value) => {
  let updateVal = (this.state.speed/speedConversion[this.state.speedUnits])*speedConversion[value];
  await this.setState({
    speedUnits: value,
    speed: updateVal
  });
  this.updateTimes();
}

percentChange = (percentage) => {
  this.setState({
    percent: percentage,
  });
}

getTimeToReach = () => {
  let current = this.state.currentSize;
  let total = this.state.totalSize;
  let speed = this.state.speed;
  let percentage = this.state.percent;
  let time = (total*percentage/100-current)/speed; //Seconds remaining at current speed
  let hours = Math.floor(time/timeConversion["hrs"]);
  time = time%timeConversion["hrs"];
  let minutes = Math.floor(time/timeConversion["mins"]);
  let seconds = (time%timeConversion["mins"]).toFixed(0);
  return hours + "hrs " + minutes + "mins " + seconds + "secs";
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
            <InputNumber min={0} defaultValue={0} onChange={this.speedChange}/>
            <Select defaultValue={this.state.speedUnits} onChange={this.speedUnitsChange}>
              <Select.Option value="KB/s">KB/s</Select.Option>
              <Select.Option value="MB/s">MB/s</Select.Option>
            </Select>
          </Input.Group>
        </Card>
      </div>
      <div className="smallContainer">
        <Card size="small">
          <Statistic
            title="Remaining/Percent"
            value={this.getRemaining()}
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
                Time to reach
                <InputNumber style={{marginRight:'2px',marginLeft:'2px'}} defaultValue={50} min={0} max={100} onChange={this.percentChange}/>
                %
              </div>)}
            value={this.getTimeToReach()}
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
