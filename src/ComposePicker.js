import React, { Component } from 'react';
import { View, TouchableHighlight, Modal, Text,Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import DateRange from './DateRange';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import normalize from './normalizeText';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const styles = {
  placeholderText: {
    color: '#c9c9c9',
    fontSize: normalize(18),
   
  },
  contentInput: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentText: {
    fontSize: normalize(16)
  },
  stylish: {
    height: 48,
    borderColor: '#bdbdbd',
    borderWidth: 2,
    borderRadius: 32
  }
};
export default class ComposePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      allowPointerEvents: true,
      showContent: false,
      selected: {},
      startDate: null,
      endDate: null,
      date: new Date(),
      focus: 'startDate',
      currentDate: moment()
    };
  }
  isDateBlocked = date => {
    if (this.props.blockBefore) {
      return date.isBefore(moment(), 'day');
    } else if (this.props.blockAfter) {
      return date.isAfter(moment(), 'day');
    }
    return false;
  };
  onDatesChange = event => {
    const { startDate, endDate, focusedInput, currentDate } = event;
    if (currentDate) {
      this.setState({ currentDate });
      return;
    }
    this.setState({ ...this.state, focus: focusedInput }, () => {
      this.setState({ ...this.state, startDate, endDate });
    });
  };
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };
  onConfirm = () => {
    const returnFormat = this.props.returnFormat || 'YYYY/MM/DD';
    const outFormat = this.props.outFormat || 'LL';
    if (!this.props.mode || this.props.mode === 'single') {
      this.setState({
        showContent: true,
        selected: this.state.currentDate.format(outFormat)
      });
      this.setModalVisible(false);
      if (typeof this.props.onConfirm === 'function') {
        this.props.onConfirm({
          currentDate: this.state.currentDate.format(returnFormat)
        });
      }
      return;
    }

    if (this.state.startDate && this.state.endDate) {
      const start = this.state.startDate.format(outFormat);
      const end = this.state.endDate.format(outFormat);
      this.setState({
        showContent: true,
        selected: {
          start: start,
          end: end
        }
      });
      this.setModalVisible(false);

      if (typeof this.props.onConfirm === 'function') {
        this.props.onConfirm({
          startDate: this.state.startDate.format(returnFormat),
          endDate: this.state.endDate.format(returnFormat),
          startWeb : this.state.startDate.format('DD/MM/YYYY'),
          endWeb : this.state.endDate.format('DD/MM/YYYY'),
          startEng : this.state.startDate.format('MM/DD/YYYY'),
          endEng : this.state.endDate.format('MM/DD/YYYY')
        });
      }
    } else {
      alert('please select correct date');
    }
  };
  getTitleElement() {
    const { placeholder, customStyles = {}, allowFontScaling } = this.props;
    const showContent = this.state.showContent;
    if (!showContent && placeholder) {
      return (
        <View style={{flexDirection:'row' , justifyContent:'center' ,backgroundColor:'#fafafa', alignContent:'center' }} >
      
        
      <View style={{  paddingVertical:10, marginHorizontal:5 , width:windowWidth*0.3,backgroundColor:'#fff' , alignItems:'center' , paddingHorizontal:5 , height:0.1*windowHeight, justifyContent:'center', elevation: 3,
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: '#333',
                    shadowOpacity: 0.3,
                    shadowRadius: 2}}>
      
        <Text
          allowFontScaling={false}
          style={[styles.contentText, customStyles.contentText]}
        > 
           Check In
        </Text>
      </View>
      <View style={{justifyContent:'center', alignContent:'center', marginHorizontal:10}}>
      
        <FontAwesome5 name='calendar-alt' size={50} />
      </View>
      
      
      
        
        <View style={{ backgroundColor:'#fff', paddingVertical:10 ,width:windowWidth*0.3, marginHorizontal:5,alignItems:'center',paddingHorizontal:5, height:0.1*windowHeight, justifyContent:'center',elevation: 3,
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: '#333',
                    shadowOpacity: 0.3,
                    shadowRadius: 2}}>
        
        <Text
          allowFontScaling={false}
          style={[styles.contentText, customStyles.contentText]}
        > 
          Check Out
        </Text>
      </View>
      </View>
      

    
      );
    }
    return (<View style={{flexDirection:'row' , justifyContent:'space-between' ,backgroundColor:'#fafafa' }} >
      <View style={{ alignItems:'center', paddingVertical:5}}>
        <Text style={{color:'black', fontSize:18}}>
          Check In
        </Text>
      <View style={{  paddingVertical:10, marginHorizontal:5 ,backgroundColor:'#fff' , alignItems:'center' , paddingHorizontal:5 , height:0.1*windowHeight, justifyContent:'center', elevation: 3,
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: '#333',
                    shadowOpacity: 0.3,
                    shadowRadius: 2}}>
      
        <Text
          allowFontScaling={false}
          style={[styles.contentText, customStyles.contentText]}
        > 
          {this.state.selected.start}
        </Text>
      </View>
      </View>
      <View style={{justifyContent:'center', alignContent:'center' , marginHorizontal:10}}>
      <Text style={{color:'#fafafa'}}>
          C
        </Text>
        <FontAwesome5 name='calendar-alt' size={50} />
      </View>
      <View style={{ alignItems:'center' , paddingVertical:5}}>
        <Text style={{color:'black', fontSize:18}}>
          Check Out
        </Text>
        <View style={{ backgroundColor:'#fff', paddingVertical:10 , marginHorizontal:5,alignItems:'center',paddingHorizontal:5, height:0.1*windowHeight, justifyContent:'center',elevation: 3,
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: '#333',
                    shadowOpacity: 0.3,
                    shadowRadius: 2}}>
        
        <Text
          allowFontScaling={false}
          style={[styles.contentText, customStyles.contentText]}
        > 
          {this.state.selected.end}
        </Text>
      </View>
      </View>
      

    </View>

    );
  }

  renderButton = () => {
    const { customButton } = this.props;

    if (customButton) {
      return customButton(this.onConfirm);
    }
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={this.onConfirm}
        style={[
          { width: '80%', marginHorizontal: '3%' },
          this.props.ButtonStyle
        ]}
      >
        <Text style={[{ fontSize: 20 }, this.props.ButtonTextStyle]}>
          {this.props.ButtonText ? this.props.ButtonText : 'Confirm'}
        </Text>
      </TouchableHighlight>
    );
  };

  render() {
    const { customStyles = {} } = this.props;

    let style = styles.stylish;
    style = this.props.centerAlign ? { ...style } : style;
    style = { ...style, ...this.props.style };

    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={() => {
          this.setModalVisible(true);
        }}
        style={[
          { width: '100%', height: '100%', justifyContent: 'center' },
          style
        ]}
      >
        <View>
          <View>
            <View style={[customStyles.contentInput, styles.contentInput]}>
              {this.getTitleElement()}
            </View>
          </View>
          <Modal
            animationType="slide"
            onRequestClose={() => this.setModalVisible(false)}
            transparent={false}
            visible={this.state.modalVisible}
          >
            <View stlye={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ height: '90%' }}>
                <DateRange
                  headFormat={this.props.headFormat}
                  customStyles={customStyles}
                  markText={this.props.markText}
                  onDatesChange={this.onDatesChange}
                  isDateBlocked={this.isDateBlocked}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  focusedInput={this.state.focus}
                  selectedBgColor={this.props.selectedBgColor || undefined}
                  selectedTextColor={this.props.selectedTextColor || undefined}
                  mode={this.props.mode || 'single'}
                  currentDate={this.state.currentDate}
                />
              </View>
              <View
                style={{
                  paddingBottom: '5%',
                  width: '100%',
                  height: '10%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {this.renderButton()}
              </View>
            </View>
          </Modal>
        </View>
      </TouchableHighlight>
    );
  }
}

ComposePicker.propTypes = {
  dateSplitter: PropTypes.string
};

ComposePicker.defaultProps = { dateSplitter: '->' };
