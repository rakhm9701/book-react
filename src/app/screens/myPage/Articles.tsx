import { Box, Card, Stack } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import { MemberUpdateInput } from "../../../lib/types/member";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import { T } from "../../../lib/types/common";
import MemberService from "../../services/MemberService";

// Atricles function
export function Atricles() {
  const { authMember, setAuthMember } = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage} `
      : ".icons/default-user.svg"
  );
  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
    }
  );

  /** HANDLERS**/
  // memebrNickHandler
  const memebrNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  // memebrPhoneHandler
  const memebrPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  // memebrAddressHandler
  const memebrAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  // memebrDescHandler
  const memebrDescHandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  // handleSubmitButtun
  const handleSubmitButtun = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);

      await sweetTopSmallSuccessAlert("Added New Article", 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  // handleImageViewer
  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    console.log("file:", file);
    const fileType = file.type,
      validateImageType = ["image/jpg", "image/jpeg", "image/png"];

    if (!validateImageType.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      if (file) {
        memberUpdateInput.memberImage = file;
        setMemberUpdateInput({ ...memberUpdateInput });
        setMemberImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <Box className={"articles"}>
      <Box className={"title"}>Create Article</Box>
      <Card className={"article-frame"}>
        <Stack className={"article"}>
          <Box className={"short-frame"}>
            <div className={"category-input"}>
              <label className={"spec-label"}>Article Categorry</label>
              <input
                className={"spec-label mb-nick"}
                type="text"
                placeholder={"Article category"}
                name="Article category"
                onChange={memebrNickHandler}
              />
            </div>
          </Box>
          <Box className={"title-frame"}>
            <div className={"title-input"}>
              <label className={"spec-label"}>Title:</label>
              <input
                className={"spec-input mb-phone"}
                type="text"
                placeholder={"Write Title here"}
                name="memberPhone"
                onChange={memebrPhoneHandler}
              />
            </div>
            <div className={"title-input"}>
              <label className={"spec-label"}>Time:</label>
              <input
                className={"spec-input  mb-address"}
                type="text"
                placeholder={"Time"}
                name="memberAddress"
                onChange={memebrAddressHandler}
              />
            </div>
          </Box>
          <Box className={"desc-frame"}>
            <div className={"long-input"}>
              <label className={"spec-label"}>Content:</label>
              <textarea
                className={"spec-textarea mb-description"}
                placeholder={""}
                name="memberDesc"
                onChange={memebrDescHandler}
              />
            </div>
          </Box>
        </Stack>
        <Box className={"img-box"}>
          <img src={memberImage?  "/img/adventure.jpg" :  "/icons/default-user.svg"} className={"mb-image"} />
          <div className={"media-change-box"}>
            <span>Upload image</span>
            <p>JPG, JPEG, PNG formats only!</p>
            <div className={"up-del-box"}>
              <Button
                className="save"
                component="label"
                onChange={handleImageViewer}
              >
                <CloudDownloadIcon />
                <input type="file" hidden />
                <Button variant={"outlined"} onClick={handleSubmitButtun}>
                  Save
                </Button>
              </Button>
            </div>
          </div>
        </Box>
      </Card>
    </Box>
  );
}
