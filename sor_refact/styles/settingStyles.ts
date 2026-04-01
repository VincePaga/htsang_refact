import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    corpo: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputView:{
      width: 300,
      backgroundColor:"white",
      borderColor:"#003f5c",
      borderWidth: 1,
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      width: 400,
      color:"#003f5c",
      fontSize: 20
    },
    Btn:{
      backgroundColor: '#2981ba',
      borderColor:"white",
      borderWidth: 1,
      borderRadius:25,
      height:50,
      width: 100,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20,
      marginBottom:10
    },
    ModalView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 0,
		backgroundColor: '#00000077'
	},	
	ModalText: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	ModalButton: {
		backgroundColor: "#2981ba",
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
  });