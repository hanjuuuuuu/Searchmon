import './App.css';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Row, Col, Radio, Select, Checkbox, Typography, Button, Form} from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
const { Option } = Select;

const plainOptions1 = ['전체', '모바일', 'PC'];
const plainOptions2 = ['전체', '여성', '남성'];
const plainOptions3 = ['전체', '~12', '13~18', '19~24', '25~29', '30~34', '35~39', '40~44', '45~49', '50~54', '55~60', '60~'];

let today = new Date();
let year = String(today.getFullYear()); //년도 
let month = String(today.getMonth()+1);  //월
let day = String(today.getDate()-1) ; //일

const App = () => {
  const [form] = Form.useForm();

  const onClick = () => { //클릭하면 값 출력
    console.log(form.getFieldsValue())
  }

  const databefore = {
    dateFromYear : year,
    dateFromMonth : month,
    dateFromDay: day
  }

  const dataafter = {
    dateToYear : year,
    dateToMonth : month,
    dateToDay: day
  }

  const onChange = (changedate) => {
    if (changedate === "all"){
      databefore.dateFromYear = '2016'
      databefore.dateFromMonth = '01'
      databefore.dateFromDay = '01'
    }
    else if(changedate === "1m"){
      databefore.dateFromYear = String(year)
      databefore.dateFromMonth = String(month-1)
      databefore.dateFromDay = String(day)
    }
    else if(changedate === "3m"){
      databefore.dateFromYear = String(year)
      databefore.dateFromMonth = String(month-3)
      databefore.dateFromDay = String(day)
    }
    else if(changedate === "1y"){
      databefore.dateFromYear = String(year)
      databefore.dateFromYear = String(year-1)
      databefore.dateFromDay = String(day)
    }
    console.log(databefore)
    form.setFieldsValue(databefore)
    form.setFieldsValue(dataafter)
  }




  return (
    <Form 
      form={form}
    >
    <div className="site-input-group-wrapper" style={{marginLeft: '30px', marginTop: '50px'}}> 
    <Input.Group size="large">
      <Row gutter={8}>
        <Col span={1}>
        <Typography.Text>주제어 1</Typography.Text>
        </Col>
        <Col span={5}> 
        <Form.Item name="subinput1"> 
          <Input placeholder="주제어 1 입력" />
        </Form.Item> 
        </Col>
        <Col span={9}>
        <Form.Item name="subinputdata1">
          <Input placeholder="주제어 1에 해당하는 모든 검색어를 컴마(,)로 구분하여 최대 20개까지 입력" />
        </Form.Item>
        </Col>
        <Col span={9}></Col>
      </Row>
    </Input.Group>
    <br />
    <Input.Group size="large">
      <Row gutter={8}>
      <Col span={1}>
      <Typography.Text>주제어 2</Typography.Text>
        </Col>
        <Col span={5}>
        <Form.Item name="subinput2"> 
          <Input placeholder="주제어 2 입력" />
        </Form.Item>
        </Col>
        <Col span={9}>
        <Form.Item name="subinputdata2">
          <Input placeholder="주제어 2에 해당하는 모든 검색어를 컴마(,)로 구분하여 최대 20개까지 입력" />
        </Form.Item>
        </Col>
      </Row>
    </Input.Group>
    <br />
    <Input.Group size="large">
      <Row gutter={8}>
      <Col span={1}>
          <Typography.Text>주제어 3</Typography.Text>
        </Col>
        <Col span={5}>
        <Form.Item name="subinput3"> 
          <Input placeholder="주제어 3 입력" />
        </Form.Item>
        </Col>
        <Col span={9}>
        <Form.Item name="subinputdata3">
          <Input placeholder="주제어 3에 해당하는 모든 검색어를 컴마(,)로 구분하여 최대 20개까지 입력" />
        </Form.Item>
        </Col>
      </Row>
    </Input.Group>
    <br />
    <Input.Group size="large">
      <Row gutter={8}>
      <Col span={1}>
          <Typography.Text>주제어 4</Typography.Text>
        </Col>
        <Col span={5}>
        <Form.Item name="subinput4"> 
          <Input placeholder="주제어 4 입력" />
        </Form.Item>
        </Col>
        <Col span={9}>
        <Form.Item name="subinputdata4">
          <Input placeholder="주제어 4에 해당하는 모든 검색어를 컴마(,)로 구분하여 최대 20개까지 입력" />
        </Form.Item>
        </Col>
      </Row>
    </Input.Group>
    <br />
    <Input.Group size="large">
      <Row gutter={8}>
      <Col span={1}>
          <Typography.Text>주제어 5</Typography.Text>
        </Col>
        <Col span={5}>
        <Form.Item name="subinput5"> 
          <Input placeholder="주제어 5 입력" />
        </Form.Item>
        </Col>
        <Col span={9}>
        <Form.Item name="subinputdata5">
          <Input placeholder="주제어 5에 해당하는 모든 검색어를 컴마(,)로 구분하여 최대 20개까지 입력" />
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
    <Form.Item name="daterange">
      <Select
      defaultValue="일간"
      style={{
        width: 120,
      }}
      >
      <Option value="일간">일간</Option>
      <Option value="주간">주간</Option>
      <Option value="월간">월간</Option>
      </Select>
      </Form.Item>
      </Row>
    
    </>
    <br />
    <Form.Item name = "dateFromYear">
    <Select defaultValue={year-1} style={{ width: 120 }}>
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
    <Select defaultValue={month} style={{ width: 120 }}>
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
    <Select defaultValue={day} style={{ width: 120 }} >
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
    <Select defaultValue={year} style={{ width: 120 }} >
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
    <Select defaultValue={month} style={{ width: 120 }}>
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
    <Select defaultValue={day} style={{ width: 120 }}>
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
    <Form.Item name="checkrange"> 
    <Checkbox.Group name = "choice" options={plainOptions1} />
    </Form.Item>
    <br />
    <Typography.Text>  성별  </Typography.Text>
    <Form.Item name="checkgender"> 
    <Checkbox.Group name = "choice" options={plainOptions2} />
    </Form.Item>
    <br />
    <Typography.Text>  연령선택  </Typography.Text>
    <Form.Item name="checkage"> 
    <Checkbox.Group name = "choice" options={plainOptions3} />
    </Form.Item>
    <br />
    <br />
    <Button type="primary" icon={<SearchOutlined />} onClick={onClick} >
      검색 데이터 조회
    </Button>

    </div>
    </Form>
  );
    }

export default App;
