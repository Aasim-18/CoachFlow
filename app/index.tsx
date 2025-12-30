import { Redirect } from 'expo-router';

export default function Index() {
  // This automatically sends the user to the Signup page inside the (auth) group
  return <Redirect href="/(auth)/" />; 
}