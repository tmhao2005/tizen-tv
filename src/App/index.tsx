import * as React from 'react';
import { globalCSS, Container, View, Text, ButtonFilled } from '@go1d/go1d';
import { TVKeyValue } from '../Constants';

globalCSS();

export const App: React.SFC<any> = () => {
  const onMute = () => {
    tizen.tvaudiocontrol.setMute(!tizen.tvaudiocontrol.isMute());
  }

  const formatTime = () => {
    return new tizen.TZDate().toTimeString();
  };

  const [time, setTime] = React.useState<string>(formatTime());
  const [cursor, setCursor] = React.useState<number | string>();

  const items = ['item 1', 'item 2'];

  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode) {

      case TVKeyValue.KEY_UP:
        setCursor(prev => {
          if (typeof prev === 'number') {
            return 'start';
          }
          if (prev === 'end') {
            return 0;
          }
          return prev;
        });
        break;

      case TVKeyValue.KEY_DOWN: 
        setCursor(prev => {
          if (typeof prev === 'undefined') {
            return 'start';
          }
          if (typeof prev === 'number') {
            return 'end';
          }
          if (prev === 'start') {
            return 0;
          }
          return prev;
        });
        
        break;

      case TVKeyValue.KEY_LEFT:
        setCursor(prev => {
          return typeof prev === 'number' && prev > 0 ? prev - 1 : prev;
        });
        break;

      case TVKeyValue.KEY_RIGHT: 
        setCursor(prev => {
          return typeof prev === 'number' && prev < items.length ? prev + 1 : prev;  
        });
        break;
    }
  }

  React.useEffect(() => {
    setInterval(() => setTime(formatTime()), 1000);    

    document.addEventListener('keydown', onKeyDown);
  }, []);

  return (
    <Container
      height="100vh"
      backgroundColor="background"
    >
      <View 
        height={1}
        justifyContent='center'
        alignItems='center'
      >
        <View marginBottom={5} color={cursor === 'start' ? 'red' : 'unset'}>
          <Text style={{
            fontSize: '2em'
          }}>{time}</Text>
        </View>

        <View flexDirection="row">
          {items.map((item, idx) => (
            <View onClick={() => console.log('call me')} key={item} minHeight={'200px'} minWidth={'120px'} color={cursor === idx ? 'red' : 'unset'}>{item}</View>
          ))}
        </View>

        <View flexDirection="row" backgroundColor={cursor === 'end' ? 'red' : 'unset'}>
          <button>View all</button>
        </View>
      </View>        
    </Container>
  )
}
