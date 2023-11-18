import React, { useEffect, useState } from "react";
import { Container, Backdrop } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    backgroundColor: "#fff",
  },
}));

export const ScrollToTop = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    window?.scrollTo(0, 0);
  }, [asPath]);

  return null;
};

const Layout = ({ children, noContainer, title, description, keywords }) => {
  const store = useSelector((state) => state);
  const classes = useStyles();
  const { loading } = store.ui;
  const { asPath } = useRouter();

  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => setPageLoaded(true), []);

  return (
    <>
      <ScrollToTop />

      <main>
        {noContainer ? (
          children
        ) : (
          <Container maxWidth="xl" disableGutters>
            {children}
          </Container>
        )}
      </main>

      {loading && (
        <Backdrop className={classes.backdrop} open={loading}>
          <object
            type="image/svg+xml"
            data="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/LoaderImage.svg"
            height={200}
            width={200}
          >
            <img
              src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/LoaderImage.svg"
              alt="stirring coffee"
              height={200}
              width={200}
            />
          </object>
        </Backdrop>
      )}
    </>
  );
};

export default Layout;
