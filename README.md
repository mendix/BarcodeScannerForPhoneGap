#BarcodeScannerForPhoneGap

[![Join the chat at https://gitter.im/mendix/BarcodeScannerForPhoneGap](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mendix/BarcodeScannerForPhoneGap?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The BarcodeScanner widget enables PhoneGap native barcode scanning functionality within your Mendix mobile application. This is a widget that will be functional from Mendix 5.10.

## Contributing

For more information on contributing to this repository visit [Contributing to a GitHub repository](https://world.mendix.com/display/howto50/Contributing+to+a+GitHub+repository)!

## Configuration

Place the widget in a dataview where you want the button to be placed. Make sure this form is reachable from a mobile application.

### Button
#### Label
The label text that is shown on the button.

#### Class
An optional class to be placed directly on the button dom node.

### Data source
#### Attribute
The attribute on the dataview object where the resulting string should be set to.

### Events
#### On change microflow
An optional microflow that will be triggered once the location has been retrieved.