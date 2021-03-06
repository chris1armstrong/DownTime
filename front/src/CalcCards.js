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
      percent: 50,            //[0-100]
      time: 0,                //Seconds
      timeUnits: "hrs",       //Current units
      end: "N/A",             //Bytes
    };
  }

getRemainingSize = () => {
  return this.state.totalSize-this.state.currentSize;
}

getPercentRemaining = () => {
  return 100 - this.getPercentDone();
}

getPercentDone = () => {
  return ((this.state.currentSize/this.state.totalSize)*100).toFixed(2);
}

totalSizeUnitsChange = async (value) => {
  let updateVal = this.state.totalSize/sizeConversion[this.state.totalSizeUnits];
  await this.setState({
    totalSizeUnits: value,
    totalSize: updateVal*sizeConversion[value]
  });
}

totalSizeChange = async (value) => {
  await this.setState({
    totalSize: value*sizeConversion[this.state.totalSizeUnits]
  });
}

currentSizeUnitsChange = async (value) => {
  let updateVal = this.state.currentSize/sizeConversion[this.state.currentSizeUnits];
  await this.setState({
    currentSizeUnits: value,
    currentSize: updateVal*sizeConversion[value],
  });
}

currentSizeChange = async (value) => {
  let updateVal = value*sizeConversion[this.state.currentSizeUnits];
  await this.setState({
    currentSize: updateVal,
  });
}

getRemaining = () => {
  let size = this.getRemainingSize();
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
  return size.toFixed(2) + order + " " + this.getPercentRemaining().toFixed(2) + "%";
}

getRemainingTime = () => {
  let time = this.getRemainingSize()/this.state.speed; //Seconds remaining at current speed
  let hours = Math.floor(time/timeConversion["hrs"]);
  time = time%timeConversion["hrs"];
  let minutes = Math.floor(time/timeConversion["mins"]);
  let seconds = (time%timeConversion["mins"]).toFixed(0);
  return hours + "hrs " + minutes + "mins " + seconds + "secs";
}

speedChange = async (value) => {
  await this.setState({
    speed: value*speedConversion[this.state.speedUnits]
  });
}

speedUnitsChange = async (value) => {
  let updateVal = (this.state.speed/speedConversion[this.state.speedUnits])*speedConversion[value];
  await this.setState({
    speedUnits: value,
    speed: updateVal
  });
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
  let signage = true;
  if (time < 0) {signage = false}
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (signage) {
    hours = Math.floor(time/timeConversion["hrs"]);
    time = time%timeConversion["hrs"];
    minutes = Math.floor(time/timeConversion["mins"]);
    seconds = (time%timeConversion["mins"]).toFixed(0);
  } else {
    hours = Math.ceil(time/timeConversion["hrs"]);
    time = time%timeConversion["hrs"];
    minutes = Math.ceil(time/timeConversion["mins"]);
    seconds = (time%timeConversion["mins"]).toFixed(0);
  }
  return hours + "hrs " + minutes + "mins " + seconds + "secs";
}

timeUnitsChange = (value) => {
  this.setState({
    timeUnits: value
  });
}

potentialDownload = () => {
  let units = this.state.timeUnits;
  let time = this.state.timeSize;
  let seconds = time*timeConversion[units];
  let speed = this.state.speed;
  let bytes = speed*seconds;
  let order = "B";
  if (bytes > sizeConversion["GB"]) {
    bytes = bytes/sizeConversion["GB"];
    order = "GB";
  } else if (bytes > sizeConversion["MB"]) {
    bytes = bytes/sizeConversion["MB"];
    order = "MB";
  } else if (bytes > sizeConversion["KB"]) {
    bytes = bytes/sizeConversion["KB"];
    order = "KB";
  }
  return bytes.toFixed(2) + order;
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
              {this.getPercentDone()}%
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
            value={this.getRemainingTime()}
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
          {this.potentialDownload()}
        </Card>
      </div>
    </div>
    )
  }
}

export default CalcCards;
