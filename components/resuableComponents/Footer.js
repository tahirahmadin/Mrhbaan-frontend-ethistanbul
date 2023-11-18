import React from "react";
import {
  Box,
  Container,
  Typography,
  Hidden,
  useMediaQuery,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  flexDirection: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      margin: "-15px 0",
      overflow: "hidden",
    },
  },
  linkItems: {
    fontWeight: "bold",
    marginRight: "2rem",
    marginBottom: 8,
  },
  icon: {
    margin: 7,
    maxHeight: 40,
    height: "100%",
    width: "100",
    objectFit: "contain",
    [theme.breakpoints.down("md")]: {
      margin: 5,
      maxHeight: 33,
    },
  },
}));

const Footer = ({ prelaunch }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const { navItems } = store.ui;
  const matches = useMediaQuery("(max-width:1150px)");
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box bgcolor="#002834">
      <footer>
        <Container maxWidth="xl">
          <Box px="1vw" pt="10vh" pb={!sm && "7vh"}>
            {!prelaunch ? (
              <Box className={classes.flexDirection}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={md ? "center" : "flex-start"}
                  width="80%"
                >
                  <img
                    src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/logo.png"
                    alt="Onerare"
                    style={{
                      maxHeight: md ? 120 : 150,
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                      marginRight: !md ? 120 : "auto",
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  textAlign="center"
                  alignItems="center"
                  width={md ? "100%" : "140%"}
                  py={md && 3}
                >
                  <Box>
                    <Typography variant="h3" color="#FF87FF">
                      What’s Cooking, {matches && <br />} Good Looking ?
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        margin: "0 auto",
                        marginTop: 6,
                        color: "#D1FF1A",
                        maxWidth: sm && "80%",
                      }}
                    >
                      JOIN OUR CHANNELS TO CATCH UP ON THE LATEST NEWS
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    maxWidth={md && "60%"}
                    flexWrap={md && "wrap"}
                    mt={md && 2}
                  >
                    <a
                      href="https://t.me/onerareofficial"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/announcementIcon.svg"
                        alt="Onerare"
                        className={classes.icon}
                      />
                    </a>
                    <a
                      href="https://t.me/onerarenft"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/telegramIcon.svg"
                        alt="Onerare"
                        className={classes.icon}
                      />
                    </a>
                    <a
                      href="https://discord.gg/D9NE9XXmFz"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/discordIcon.svg"
                        alt="Onerare"
                        className={classes.icon}
                      />
                    </a>
                    <a
                      href="https://twitter.com/onerarenft"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/twitterIcon.svg"
                        alt="Onerare"
                        className={classes.icon}
                      />
                    </a>
                    <a
                      href="https://www.facebook.com/onerarenft"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/facebookIcon.svg"
                        alt="Onerare"
                        className={classes.icon}
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/onerarenft/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/instagramIcon.svg"
                        alt="Onerare"
                        className={classes.icon}
                      />
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCnwvRExem_XxodFE0od22HA"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/youtubeIcon.svg"
                        alt="Onerare"
                        className={classes.icon}
                      />
                    </a>
                    <a
                      href="https://onerarenft.medium.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/mediumIcon.svg"
                        alt="Onerare"
                        className={classes.icon}
                      />
                    </a>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  alignItems="flex-end"
                  justifyContent={md ? "center" : "flex-end"}
                  textAlign="center"
                  width={md ? "100%" : "80%"}
                  height={md ? 100 : 300}
                  pb={md && 4}
                >
                  <p
                    style={{
                      fontFamily: "Karla",
                      fontWeight: 700,
                      fontSize: 16,
                      textAlign: "center",
                      color: "#FFFFFF",
                    }}
                  >
                    © ONERARE 2023. All Rights Reserved.
                  </p>
                </Box>
              </Box>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
              >
                <Box>
                  <Typography variant="h2" color="#FF87FF">
                    What’s Cooking, {matches && <br />} Good Looking ?
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", color: "#D1FF1A" }}
                  >
                    JOIN US TO CATCH UP ON THE LATEST NEWS
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center" mt={4}>
                  <Box display="flex">
                    <img
                      src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/discordIcon.svg"
                      alt="discord"
                      style={{
                        marginRight: theme.spacing(1),
                      }}
                      onClick={() =>
                        window.open("https://discord.gg/D9NE9XXmFz")
                      }
                    />
                    {!matches && (
                      <Typography
                        variant="body2"
                        style={{ marginRight: theme.spacing(5) }}
                      >
                        DISCORD
                      </Typography>
                    )}
                  </Box>
                  <Box display="flex">
                    <img
                      src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/telegramIcon.svg"
                      alt="telegram"
                      style={{
                        marginRight: theme.spacing(1),
                      }}
                      onClick={() =>
                        window.open("https://t.me/joinchat/pO88PtVrRQc3NWE9")
                      }
                    />
                    {!matches && (
                      <Typography
                        variant="body2"
                        style={{ marginRight: theme.spacing(5) }}
                      >
                        TELEGRAM
                      </Typography>
                    )}
                  </Box>
                  <Box display="flex">
                    <img
                      src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/twitterIcon.svg"
                      alt="twitter"
                      style={{
                        marginRight: theme.spacing(1),
                      }}
                      onClick={() =>
                        window.open("https://twitter.com/onerarenft")
                      }
                    />
                    {!matches && (
                      <Typography
                        variant="body2"
                        style={{ marginRight: theme.spacing(5) }}
                      >
                        TWITTER
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      </footer>
    </Box>
  );
};

export default Footer;
