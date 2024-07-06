import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PendingApproval = () => {

  /*
    Steps Approval:
    1. User successfully signs up.
    2. Uploading / Skipping the upload profpic
    3. On page before Home: checks if the user's is_admin_verified is TRUE
    4. if is_admin_verified is TRUE, forward to Home
    5. else if FALSE, forward HERE
    6. STREAM calling the API to check if is_admin_verified has changed from FALSE to TRUE
    7. if is_admin_verified changed to TRUE, forward to Home
  */

    

  return (
    <View>
      <Text>PendingApproval</Text>
    </View>
  )
}

export default PendingApproval