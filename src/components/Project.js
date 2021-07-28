import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const Project = () => {
  const history = useHistory();
  const [tokenName, settokenName] = useState();
  const [tokenAvailable, settokenAvailable] = useState("");

  async function callAboutPage() {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (!(res.status === 200) || data.stat === "wrong") {
        throw new Error("Invalid Login");
      }
    } catch (err) {
      console.log(err);
      history.push("/Login");
    }
  }

  useEffect(() => {
    callAboutPage();
  }, []);

  async function getToken(e) {
    let tokenInputVal = e.target.value;
    try {
      const res = await fetch("/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenInputVal,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (!(res.status === 200) || data.stat === "wrong" || !data) {
        throw new Error("Invalid Login");
      }

      settokenName(data.name);
      settokenAvailable(data.tokens);
    } catch (err) {
      settokenName("Wrong Token Address");
      settokenAvailable("");
    }
  }

  return (
    <>
      <div className="container-fluid formBack">
        <div className="row">
          <div className="mt-5 mb-5 col-md-8 col-10 mx-auto projectContainer">
            <div className="header">
              <h2>Token Appication Form</h2>
            </div>
            <form>
              <h3 className="typeOfData">Basic Information</h3>

              <div class="mb-3">
                <label for="TokenAddress" className="form-label">
                  Token Contract Address*
                </label>
                <input
                  type="text"
                  onBlur={getToken}
                  className="form-control"
                  id="TokenAddress"
                />
              </div>

              <div class="mb-3">
                <label for="RequesterName" className="form-label">
                  Requester Name*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="RequesterName"
                />
              </div>

              <div class="mb-3">
                <label for="RequesterEmail" className="form-label">
                  Requester Email Adress*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="RequesterEmail"
                />
              </div>

              <div class="mb-3">
                <label for="ProjectName" className="form-label">
                  Project Name
                </label>
                <input type="text" className="form-control" id="ProjectName" />
              </div>

              <div class="mb-3">
                <label for="OfficialProjectWebsite" className="form-label">
                  Official Project Website*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="OfficialProjectWebsite"
                />
              </div>

              <div class="mb-3">
                <label for="OfficialProjectEmailAddress" className="form-label">
                  Official Project Email Address*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="OfficialProjectEmailAddress"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  Please make sure the email provided has the project officail
                  domain as its prefix
                </div>
              </div>

              <div class="mb-3">
                <label for="logo" className="form-label">
                  Choose a 32x32 png icon logo*
                </label>
                <div class="input-group mb-3">
                  <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile02"
                  />
                  <label class="input-group-text" for="inputGroupFile02">
                    Upload
                  </label>
                </div>
              </div>

              <div class="mb-3">
                <label for="ProjectSector" className="form-label">
                  Project Sector
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ProjectSector"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  Please soecify the industry/field that the project is a part
                  of
                </div>
              </div>

              <div class="mb-3">
                <label for="ProjectDescription" className="form-label">
                  Project Description (Max 300 characters)*
                </label>
                <textarea
                  class="form-control"
                  id="ProjectDescription"
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="token" className="form-label">
                  Token Name : {tokenName}
                </label>
                <input
                  type="text"
                  readOnly
                  value={tokenAvailable}
                  className="form-control"
                  id="token"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  Please soecify the industry/field that the project is a part
                  of
                </div>
              </div>

              <h3 className="typeOfData">Social Profiles</h3>

              <div class="mb-3">
                <label for="whitepaper" className="form-label">
                  WhitePaper
                </label>
                <input type="text" className="form-control" id="whitepaper" />
              </div>

              <div class="mb-3">
                <label for="telegram" className="form-label">
                  Telegram
                </label>
                <input type="text" className="form-control" id="telegram" />
              </div>

              <div class="mb-3">
                <label for="discord" className="form-label">
                  Discord
                </label>
                <input type="text" className="form-control" id="discord" />
              </div>

              <div class="mb-3">
                <label for="twitter" className="form-label">
                  Twitter
                </label>
                <input type="text" className="form-control" id="twitter" />
              </div>

              <div class="mb-3">
                <label for="medium" className="form-label">
                  Medium
                </label>
                <input type="text" className="form-control" id="medium" />
              </div>

              <h3 className="typeOfData">Price Data</h3>

              <div class="mb-3">
                <label for="coinmarketcap" className="form-label">
                  CoinMarketCap Ticker
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="coinmarketcap"
                />
              </div>

              <div class="mb-3">
                <label for="coingecko" className="form-label">
                  CoinGecko Ticker
                </label>
                <input type="text" className="form-control" id="coingecko" />
              </div>
              {/* <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" for="exampleCheck1">
                  Check me out
                </label>
              </div> */}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
