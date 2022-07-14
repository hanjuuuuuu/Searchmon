import './App.css';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Row, Col, Radio, Select, Checkbox, Typography, Button, Form, Modal} from 'antd';
import 'antd/dist/antd.css';
import React, {useState, useEffect} from 'react';
import { Line } from '@ant-design/plots';
import axios from 'axios'
import produce from 'immer';

const { Option } = Select;
const moment = require('moment')

const plainOptions1 = [{label:'전체', value:''}, {label:'모바일', value:'mo'}, {label:'PC', value:'pc'}];
const plainOptions2 = [{label:'전체', value:''}, {label:'여성', value:'f'}, {label:'남성', value:'m'}];
const plainOptions3 = [{label: '전체', value: ''}, {label: '~12', value: '1'}, {label: '13~18', value: '2'},{label: '19~24', value: '3'},
                      {label: '25~29', value: '4'},{label: '30~34', value: '5'},{label: '35~39', value: '6'},{label: '40~44', value: '7'},
                      {label: '45~49', value: '8'},{label: '50~54', value: '9'},{label: '55~60', value: '10'},{label: '60~', value: '11'}];

const categoryConfig = {data: [
  {
  "period": "",
  "ratio": 0,
  "category": ""
  }
 ],
 padding: 'auto',
 xField: 'period',
 yField: 'ratio',
 seriesField: 'category',
 xAxis: {
   // type: 'timeCat',
   tickCount: 10,
 },
 colorField: 'type', // or seriesField in some cases
 color: ['#d62728', '#2ca02c', '#efcc2c','#7f4ab9', '#62b9ef'],
}

let today = new Date();
let year = String(today.getFullYear()); //년도 
let month = String(today.getMonth()+1);  //월
let day = String(today.getDate()-1) ; //일

const App = () => {
  const [subnum, setSubnum] = useState(1);
  const [searchnum, setSearchnum] = useState();
  const [chartInfo, setChartInfo] = useState(categoryConfig);
  const [form] = Form.useForm();
  
  const queryTemplete = {
    startDate: "",
    endDate: "",
    timeUnit: "date",
    keywordGroups: [
        {
            groupName: "",
            keywords: []
            
        },
        {
          groupName: "",
          keywords: []
          
      },
      {
        groupName: "",
        keywords: []
        
    },
    {
      groupName: "",
      keywords: []
      
  },
  {
    groupName: "",
    keywords: []
    
  },
    ],
    device: "",
    ages:[],
    gender: ""
 } 

  const info = () => {    //주제어, 검색어 모두 입력안했을 때 modal 창
    Modal.info({
      title: 'searchmon 내용:',
      content: (
        <div>
          <p>주제어와 검색어를 입력해 주시기 바랍니다.</p>
        </div>
      ),
      onOk() {},
    });
  };

  const subcheck = (sub) => {    //주제어 순서대로 입력안했을 때 modal 창
    let getInfo = form.getFieldsValue()
    switch(sub){
      case 'subinput2':
        setSubnum(1)
        getInfo.subinput = getInfo.subinput1
        break;
      case 'subinput3':
        if(!getInfo.subinput1){
          setSubnum(1)
          getInfo.subinput = getInfo.subinput1
          break;
        }
        else{
          setSubnum(2)
          getInfo.subinput = getInfo.subinput2
          break;
        }
      case 'subinput4':
        if(!getInfo.subinput1){
          setSubnum(1)
          getInfo.subinput = getInfo.subinput1
          break;
        }
        else if(!getInfo.subinput2){
          setSubnum(2)
          getInfo.subinput = getInfo.subinput2
          break;
        }
        else{
          setSubnum(3)
          getInfo.subinput = getInfo.subinput3
          break;
        }
      case 'subinput5':
        if(!getInfo.subinput1){
          setSubnum(1)
          getInfo.subinput = getInfo.subinput1
          break;
        }
        else if(!getInfo.subinput2){
          setSubnum(2)
          getInfo.subinput = getInfo.subinput2
          break;
        }
        else if(!getInfo.subinput3){
          setSubnum(3)
          getInfo.subinput = getInfo.subinput3
          break;
        }
        else{
          setSubnum(4)
          getInfo.subinput = getInfo.subinput4
          break;
        }
    }

    if(!getInfo.subinput){
      Modal.info({
        title: 'searchmon 내용:',
        content: (
          <div>
            <p>주제어{subnum}부터 입력해 주시기 바랍니다.</p>
          </div>
        ),
        onOk() {},
      });
    }
  };

  const searchcheck = (search) => {    //주제어를 입력하지 않고 검색어부터 입력하려고 할 때의 modal 창 (searchnum 다시 수정하기)
    let getInfo = form.getFieldsValue()
    switch(search){
      case 'subinputdata1':
        setSearchnum(1)
        getInfo.subinput = getInfo.subinput1 
        break;
      case 'subinputdata2':
        setSearchnum(2)
        getInfo.subinput = getInfo.subinput2 
        break;
      case 'subinputdata3':
        setSearchnum(3)
        getInfo.subinput = getInfo.subinput3 
        break;
      case 'subinputdata4':
        setSearchnum(4)
        getInfo.subinput = getInfo.subinput4 
        break;
      case 'subinputdata5':
        setSearchnum(5)
        getInfo.subinput = getInfo.subinput5
        break; 
    }

    if(!getInfo.subinput){
      Modal.info({
        title: 'searchmon 내용:',
        content: (
          <div>
            <p>주제어{searchnum}부터 입력해 주시기 바랍니다.</p>
          </div>
        ),
        onOk() {},
      });
    }
  };

  const updatePeriod = (dateFrom) => {  //날짜 문자열 자르기
    let dateTo = moment().subtract(1, 'days').format("YYYYMMDD")
    const currentData = form.getFieldsValue()
    currentData.dateFromYear = dateFrom.substring(0,4)
    currentData.dateFromMonth = dateFrom.substring(4,6)
    currentData.dateFromDay = dateFrom.substring(6,8)

    currentData.dateToYear = dateTo.substring(0,4)
    currentData.dateToMonth = dateTo.substring(4,6)
    currentData.dateToDay = dateTo.substring(6,8)

    return currentData
  }

  const onChange = (changedate) => {  //라디오버튼 클릭에 따라 날짜 변경
    let dateFrom = moment().subtract(1, 'days').format("YYYYMMDD")
    if (changedate === "all")
      dateFrom = "20160101"
    else if (changedate === "1m")
      dateFrom = moment().subtract(1, 'months').format('YYYYMMDD')
    else if (changedate === "3m")
      dateFrom = moment().subtract(3, 'months').format('YYYYMMDD')
    else if (changedate === "1y")
      dateFrom = moment().subtract(1, 'years').format('YYYYMMDD')

    let finalDate = updatePeriod(dateFrom)
    form.setFieldsValue(finalDate)
  }

  const updateDate = () => {    //라디오버튼 직접입력으로 변경
    let currentDate = form.getFieldsValue()
    currentDate.date = "self"
    form.setFieldsValue(currentDate)

  }

  // const updateLayout = () => {    //주간, 월간일때 day 삭제
  //   let currentLayout = form.getFieldsValue()
  //   currentLayout.dateFromDay.removeIcon()
  //   currentLayout.dateToDay.removeIcon()
  //   form.setFieldsValue(currentLayout)
  // }

  // const updateCheck = () => {     //전체를 선택하면 설정안함으로해서 모든 값 주기 

  // }

  const onClick = () => { //클릭하면 주제어, 검색어 입력했는지 확인 후에 값 출력
    let fieldData = form.getFieldsValue()
    if (!(fieldData.subinput1 || fieldData.subinputdata1 || fieldData.subinput2 || fieldData.subinputdata2 || fieldData.subinput3 || fieldData.subinputdata3 || fieldData.subinput4 || fieldData.subinputdata4)){
      info()
    }
    else
      console.log(form.getFieldsValue())
    
      const queryData = {...queryTemplete}

  
      queryData.startDate = fieldData.dateFromYear + "-" + fieldData.dateFromMonth + "-" + fieldData.dateFromDay
      queryData.endDate = fieldData.dateToYear + "-" + fieldData.dateToMonth + "-" + fieldData.dateToDay
      queryData.timeUnit = fieldData.timeUnit

      queryData.keywordGroups[0].groupName = fieldData.subinput1
      queryData.keywordGroups[0].keywords.push(fieldData.subinputdata1)
      queryData.keywordGroups[1].groupName = fieldData.subinput2
      queryData.keywordGroups[1].keywords.push(fieldData.subinputdata2)
      queryData.keywordGroups[2].groupName = fieldData.subinput3
      queryData.keywordGroups[2].keywords.push(fieldData.subinputdata3)
      queryData.keywordGroups[3].groupName = fieldData.subinput4
      queryData.keywordGroups[3].keywords.push(fieldData.subinputdata4)
      queryData.keywordGroups[4].groupName = fieldData.subinput5
      queryData.keywordGroups[4].keywords.push(fieldData.subinputdata5)

      queryData.device = fieldData.device.join()
      for(var i=0; i<fieldData.ages.length; i++){
        queryData.ages.push(fieldData.ages[i])
      }
      queryData.gender = fieldData.gender.join()

      console.log(queryData)


      axios.post("http://localhost:8080/hanju", 
        queryData
      )
      .then((response) => {
        console.log('_______________response')
        console.log(response.data)
        console.log('_________________________')
  
        setChartInfo(produce(categoryConfig, draft => {      //chartInfo의 복사본에 response값 대입
          draft.data = []
          // for(var i=0; i<response.data.results[0].data.length; i++) {
          //   draft.data.push(response.data.results[0].data[i]);
          // }

          for(var i=0; i<response.data.results.length; i++) {
            for(var j=0; j<response.data.results[0].data.length; j++) { 
              const chartInfo = {}
              chartInfo.period = response.data.results[i].data[j].period
              chartInfo.ratio = response.data.results[i].data[j].ratio
              chartInfo.category = response.data.results[i].title  
              draft.data.push(chartInfo);
            }   
          }
          
          }))
      })
      .catch((error) => {console.log(error)
      });   

  }

  // useEffect(() => {
  //   console.log("_________________________")
  //   console.log(categoryConfig)
  //   console.log("_________________________")
  // }, [chartInfo])

  return (
    <>
      <Form 
      form={form}
    >
    <div className="site-input-group-wrapper" style={{marginLeft: '30px', marginTop: '50px'}}> 
    <Input.Group size="large">
      <Row gutter={8}>
        <Col span={2}>
        <Typography.Text>주제어 1</Typography.Text>
        </Col>
        <Col span={5}> 
        <Form.Item name="subinput1"> 
          <Input placeholder="주제어 1 입력" />
        </Form.Item> 
        </Col>
        <Col span={9}>
        <Form.Item name="subinputdata1">
          <Input placeholder="주제어 1에 해당하는 모든 검색어를 컴마(,)로 구분하여 최대 20개까지 입력" onFocus={() => searchcheck("subinputdata1")}/>
        </Form.Item>
        </Col>
        <Col span={9}></Col>
      </Row>
    </Input.Group>
    <br />
    <Input.Group size="large">
      <Row gutter={8}>
      <Col span={2}>
      <Typography.Text>주제어 2</Typography.Text>
        </Col>
        <Col span={5}>
        <Form.Item name="subinput2"> 
          <Input placeholder="주제어 2 입력" onFocus={() => subcheck("subinput2")} />
        </Form.Item>
        </Col>
        <Col span={9}>
        <Form.Item name="subinputdata2">
          <Input placeholder="주제어 2에 해당하는 모든 검색어를 컴마(,)로 구분하여 최대 20개까지 입력" onFocus={() => searchcheck("subinputdata2")}/>
        </Form.Item>
        </Col>
      </Row>
    </Input.Group>
    <br />
    <Input.Group size="large">
      <Row gutter={8}>
      <Col span={2}>
          <Typography.Text>주제어 3</Typography.Text>
        </Col>
        <Col span={5}>
        <Form.Item name="subinput3"> 
          <Input placeholder="주제어 3 입력" onFocus={() => subcheck("subinput3")}/>
        </Form.Item>
        </Col>
        <Col span={9}>
        <Form.Item name="subinputdata3">
          <Input placeholder="주제어 3에 해당하는 모든 검색어를 컴마(,)로 구분하여 최대 20개까지 입력" onFocus={() => searchcheck("subinputdata3")}/>
        </Form.Item>
        </Col>
      </Row>
    </Input.Group>
    <br />
    <Input.Group size="large">
      <Row gutter={8}>
      <Col span={2}>
          <Typography.Text>주제어 4</Typography.Text>
        </Col>
        <Col span={5}>
        <Form.Item name="subinput4"> 
          <Input placeholder="주제어 4 입력" onFocus={() => subcheck("subinput4")}/>
        </Form.Item>
        </Col>
        <Col span={9}>
        <Form.Item name="subinputdata4">
          <Input placeholder="주제어 4에 해당하는 모든 검색어를 컴마(,)로 구분하여 최대 20개까지 입력" onFocus={() => searchcheck("subinputdata4")}/>
        </Form.Item>
        </Col>
      </Row>
    </Input.Group>
    <br />
    <Input.Group size="large">
      <Row gutter={8}>
      <Col span={2}>
          <Typography.Text>주제어 5</Typography.Text>
        </Col>
        <Col span={5}>
        <Form.Item name="subinput5"> 
          <Input placeholder="주제어 5 입력" onFocus={() => subcheck("subinput5")}/>
        </Form.Item>
        </Col>
        <Col span={9}>
        <Form.Item name="subinputdata5">
          <Input placeholder="주제어 5에 해당하는 모든 검색어를 컴마(,)로 구분하여 최대 20개까지 입력" onFocus={() => searchcheck("subinputdata5")}/>
        </Form.Item>
        </Col>
      </Row>
    </Input.Group>
    <>
    <br />
    <Row gutter={16}>
    <br />
    <br />
    <Form.Item name="date">
    <Radio.Group defaultValue="1y" buttonStyle="solid" >
      <Radio.Button value="all" onChange={() => onChange('all')}>전체</Radio.Button>
      <Radio.Button value="1m" onChange={() => onChange('1m')}>1개월</Radio.Button>
      <Radio.Button value="3m" onChange={() => onChange('3m')}>3개월</Radio.Button>
      <Radio.Button value="1y" onChange={() => onChange('1y')}>1년</Radio.Button>
      <Radio.Button value="self">직접입력</Radio.Button>
    </Radio.Group>
    </Form.Item>
    <br />
    <Form.Item name="timeUnit">
      <Select defaultValue="date"
      style={{
        marginLeft: '30px',
        width: 120,
      }}
      >
      <Option value="date">일간</Option>
      <Option value="week" >주간</Option>
      <Option value="month" >월간</Option>
      </Select>
      </Form.Item>
      </Row>
    
    </>
    <br />
    <Form.Item name = "dateFromYear">
    <Select defaultValue={year-1} style={{ width: 120 }} onChange={updateDate}>
      <Option value="2016">2016</Option>
      <Option value="2017">2017</Option>
      <Option value="2018">2018</Option>
      <Option value="2019">2019</Option>
      <Option value="2020">2020</Option>
      <Option value="2021">2021</Option>
      <Option value="2022">2022</Option>
    </Select>
    </Form.Item>
    <Form.Item name = "dateFromMonth">
    <Select defaultValue={month} style={{ width: 120 }} onChange={updateDate}>
      <Option value="01">01</Option>
      <Option value="02">02</Option>
      <Option value="03">03</Option>
      <Option value="04">04</Option>
      <Option value="05">05</Option>
      <Option value="06">06</Option>
      <Option value="07">07</Option>
      <Option value="08">08</Option>
      <Option value="09">09</Option>
      <Option value="10">10</Option>
      <Option value="11">11</Option>
      <Option value="12">12</Option>
    </Select>
    </Form.Item>
    <Form.Item name = "dateFromDay">
    <Select defaultValue={day} style={{ width: 120 }} onChange={updateDate} >
      <Option value="01">01</Option>
      <Option value="02">02</Option>
      <Option value="03">03</Option>
      <Option value="04">04</Option>
      <Option value="05">05</Option>
      <Option value="06">06</Option>
      <Option value="07">07</Option>
      <Option value="08">08</Option>
      <Option value="09">09</Option>
      <Option value="10">10</Option>
      <Option value="11">11</Option>
      <Option value="12">12</Option>
      <Option value="13">13</Option>
      <Option value="14">14</Option>
      <Option value="15">15</Option>
      <Option value="16">16</Option>
      <Option value="17">17</Option>
      <Option value="18">18</Option>
      <Option value="19">19</Option>
      <Option value="20">20</Option>
      <Option value="21">21</Option>
      <Option value="22">22</Option>
      <Option value="23">23</Option>
      <Option value="24">24</Option>
      <Option value="25">25</Option>
      <Option value="26">26</Option>
      <Option value="27">27</Option>
      <Option value="28">28</Option>
      <Option value="29">29</Option>
      <Option value="30">30</Option>
      <Option value="31">31</Option>
    </Select>
    </Form.Item>
    <Typography.Text>  ~  </Typography.Text>
    <Form.Item name = "dateToYear">
    <Select defaultValue={year} style={{ width: 120 }}onChange={updateDate}>
      <Option value="2016">2016</Option>
      <Option value="2017">2017</Option>
      <Option value="2018">2018</Option>
      <Option value="2019">2019</Option>
      <Option value="2020">2020</Option>
      <Option value="2021">2021</Option>
      <Option value="2022">2022</Option>
    </Select>
    </Form.Item>
    <Form.Item name = "dateToMonth">
    <Select defaultValue={month} style={{ width: 120 }} onChange={updateDate}>
      <Option value="01">01</Option>
      <Option value="02">02</Option>
      <Option value="03">03</Option>
      <Option value="04">04</Option>
      <Option value="05">05</Option>
      <Option value="06">06</Option>
      <Option value="07">07</Option>
      <Option value="08">08</Option>
      <Option value="09">09</Option>
      <Option value="10">10</Option>
      <Option value="11">11</Option>
      <Option value="12">12</Option>
    </Select>
    </Form.Item>
    <Form.Item name = "dateToDay">
    <Select defaultValue={day} style={{ width: 120 }} onChange={updateDate}>
      <Option value="01">01</Option>
      <Option value="02">02</Option>
      <Option value="03">03</Option>
      <Option value="04">04</Option>
      <Option value="05">05</Option>
      <Option value="06">06</Option>
      <Option value="07">07</Option>
      <Option value="08">08</Option>
      <Option value="09">09</Option>
      <Option value="10">10</Option>
      <Option value="11">11</Option>
      <Option value="12">12</Option>
      <Option value="13">13</Option>
      <Option value="14">14</Option>
      <Option value="15">15</Option>
      <Option value="16">16</Option>
      <Option value="17">17</Option>
      <Option value="18">18</Option>
      <Option value="19">19</Option>
      <Option value="20">20</Option>
      <Option value="21">21</Option>
      <Option value="22">22</Option>
      <Option value="23">23</Option>
      <Option value="24">24</Option>
      <Option value="25">25</Option>
      <Option value="26">26</Option>
      <Option value="27">27</Option>
      <Option value="28">28</Option>
      <Option value="29">29</Option>
      <Option value="30">30</Option>
      <Option value="31">31</Option>
    </Select>
    </Form.Item>
    <br />
    <br />
    <Typography.Text>  범위  </Typography.Text>
    <Form.Item name="device"> 
    <Checkbox.Group name = "choice" options={plainOptions1} />
    </Form.Item>
    <br />
    <Typography.Text>  성별  </Typography.Text>
    <Form.Item name="gender"> 
    <Checkbox.Group name = "choice" options={plainOptions2} />
    </Form.Item>
    <br />
    <Typography.Text>  연령선택  </Typography.Text>
    <Form.Item name="ages"> 
    <Checkbox.Group name = "choice" options={plainOptions3} />
    </Form.Item>
    <br />
    <br />
    <Button type="primary" icon={<SearchOutlined />} onClick={onClick} >
      검색 데이터 조회
    </Button>

    </div>
      </Form>
      <br />
      <Line {...chartInfo} />
  </>
  )
}

export default App;
