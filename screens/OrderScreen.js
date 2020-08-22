import { StatusBar } from 'expo-status-bar';
import React, {PureComponent} from 'react';
import { StyleSheet, Text, View, ContainerView, Picker, TextInput } from 'react-native';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import Button from '../components/Button';


Stripe.setOptionsAsync({
  publishableKey: 'pk_test_51H9gUuBufMHEUT86HkwdN9faiHJVEHxLMFN1qnds596GPzMjYoXxoSfT79mVOx3w11TkOTtk10PtyNEfewcnI6g800Iy1kXYmF', // Your key
  //androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
  //merchantId: 'your_merchant_id', // [optional] used for payments with ApplePay
  
});


const options = {
  requiredBillingAddressFields: 'full',
  prefilledInformation: {
    billingAddress: {
      name: 'Gunilla Haugeh',
      line1: 'Canary Place',
      line2: '3',
      city: 'Macon',
      state: 'Georgia',
      country: 'US',
      postalCode: '31217',
    },
  },
};




export default class CardFormScreen extends PureComponent {
  static title = 'Card Form'

  state = {
    loading: false,
    token: null,
    choosenLabel1: '', 
    choosenindex1: '',
    choosenLabel2: '', 
    choosenindex2: '',
    TextInputValue1: '',
    TextInputValue2: '',
    TextInputValue3: ''
  }


  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null });
      //const token = await Stripe.paymentRequestWithAndroidPayAsync(options);
      const token = await Stripe.paymentRequestWithCardFormAsync(options);
      this.setState({ loading: false, token })
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  render() {
    const { loading, token } = this.state

    return (
      <View style={styles.container}>
        
        
        <Picker selectedValue={this.state.choosenLabel1}
          onValueChange={
          (itemValue, itemIndex) => this.setState({
               choosenLabel1: itemValue, 
               choosenindex1:itemIndex})
        }>
            <Picker.Item label = "California Roll" value = "word1" />
            <Picker.Item label = "Boston Roll" value = "word2" />
            <Picker.Item label = "British Columbia Roll" value = "word3" />
            <Picker.Item label = "Sushi Burrito" value = "word4" />
            <Picker.Item label = "Tuna Roll" value = "word5" />
            <Picker.Item label = "Philadelphia Roll" value = "word6" />
        </Picker>

        <Picker selectedValue={this.state.choosenLabel2}
          onValueChange={
          (itemValue, itemIndex) => this.setState({
               choosenLabel2: itemValue, 
               choosenindex2:itemIndex})
        }>
            <Picker.Item label = "1" value = "$5" />
            <Picker.Item label = "2" value = "$10" />
            <Picker.Item label = "3" value = "$15" />
            <Picker.Item label = "4" value = "$20" />
            <Picker.Item label = "5" value = "$25" />
            <Picker.Item label = "6" value = "$30" />
        </Picker>
        <Text style = {styles.text}>{this.state.choosenLabel2}</Text>
        
        <Text style={styles.instruction}>
          Click button to cpnduct payment
        </Text>
        <Button
          text="Enter you card and pay"
          loading={loading}
          onPress={this.handleCardPayPress}
          //{...testID('cardFormButton')}
        />
        <View
          style={styles.token}
          //{...testID('cardFormToken')}
          >
          {token &&
            <Text style={styles.instruction}>
              Token: {token.tokenId}
            </Text>
            
          }
          
        </View>
        <TextInput
          placeholder="Enter Address"
          onChangeText={TextInputValue =>
            this.setState({ TextInputValue: TextInputValue })
          }
          style={styles.TextInputStyle}
        />
        <TextInput
          placeholder="Enter City"
          onChangeText={TextInputValue =>
            this.setState({ TextInputValue: TextInputValue })
          }
          style={styles.TextInputStyle}
        />
        <TextInput
          placeholder="Enter Postal Code"
          onChangeText={TextInputValue =>
            this.setState({ TextInputValue: TextInputValue })
          }
          style={styles.TextInputStyle}
        />
        <Button
          text="Start Tracking"
          loading={loading}
          onPress={() => this.props.navigation.navigate('TrackScreen')}
          //{...testID('cardFormButton')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
 },
 TextInputStyle: {
  textAlign: 'center',
  height: 50,
  width: '70%',
  marginBottom: 10,
},
})