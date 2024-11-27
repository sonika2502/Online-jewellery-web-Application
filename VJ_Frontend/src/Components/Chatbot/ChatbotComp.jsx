import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import img from "../../img/chat-bot.png";
import {
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useRef } from "react";
import { useEffect } from "react";

export default function ChatbotComp() {
  const [first, setfirst] = React.useState([]);
  const [text, setText] = React.useState();
  const [qas, setQas] = React.useState([
    {
      qn: "asdsad",
      ans: "w",
    },
    {
      qn: "sdsa sadsad s ",
      ans: "addasd sad",
    },
  ]);

  const bottomRef = useRef(null);
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [first]);
  const setChat = (type) => {
    let chat = {};
    let Alexchat = {};

    if (type == "user") {
      chat = {
        type: "user",
        text: text,
        alexa: "Hello! I'm here to assist you with any query you might have.",
        textalign: "right",
      };
    } else {
      Alexchat = {
        type: "Alexa",
        text: text,
        textalign: "left",
      };
    }

    let newArry = [...first, chat];
    setfirst(newArry);

    setText("");
  };
  return (
    <div>
      
      {/* <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chatbot
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Grid container spacing={2} sx={{ position: "relative", width: "25vw" }}>
        <Grid item xs={12} md={12} sx={{ position: "" }}>
        <div style={{display:"flex",position:"fixed",zIndex:999,alignItems:"center",justifyContent:"center",fontSize:30,height:"50px",width:"25vw",backgroundColor:"#6D67E4"}}>ChatBot</div>

          {first.map((row) => {
            let start_end = row.textalign == "right" ? "end" : "start";
            // alert()
            return (
              
              <div ref={bottomRef}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: start_end,
                    marginBottom: "10px",
                    // width: "100vw",
                  }}
                >
                  <div
                    style={{
                      gap: 4,
                      maxWidth: 200,
                      display: "flex",
                      justifyContent: start_end,
                      width: "auto",
                      borderRadius: "20px",
                      backgroundColor: "#EFEFEF",
                      padding: "20px",
                    }}
                  >
                    {row.text}
                    <AccountCircleIcon style={{ color: "blue" }} />{" "}
                  </div>
                </div>
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "start",
                    width: "100vw",
                  }}
                >
                  <div
                    style={{
                      gap: 4,
                      maxWidth: 200,
                      display: "flex",
                      justifyContent: start_end,
                      alignItems: "center",
                      width: "auto",
                      borderRadius: "20px",
                      backgroundColor: "#BEDBBB",
                      padding: "20px",
                    }}
                  >
                    <img src={img} style={{ width: "30px", height: "30px" }} />{" "}
                    {row.alexa}{" "}
                  </div>
                </div>
              </div>
            );
          })}
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{ position: "fixed", bottom: 20, width: "26vw" }}
        >
          <FormControl
            fullWidth
            variant="outlined"
            style={{
              width: "100%",
              // position: "fixed",
              // bottom: 0,
              background: "white",
            }}
          >
            <OutlinedInput
              multiline
              fullWidth
              id="outlined-adornment-weight"
              placeholder="type here..."
              endAdornment={
                <InputAdornment position="end">
                  <SendIcon
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => {
                      setChat("user");
                    }}
                  />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <FormHelperText id="outlined-weight-helper-text"></FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
