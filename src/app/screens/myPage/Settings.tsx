import { Box } from "@mui/material";
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

// Settings function
export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage} `
      : "/icons/default-user.svg"
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

      await sweetTopSmallSuccessAlert("Modify succed", 700);
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
    <Box className={"settings"}>
      <Box className={"title"}>Update Page</Box>
      <Box className={"member-media-frame"}>
        <img src={memberImage} alt="" className={"mb-image"} />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={"up-del-box"}>
            <Button component="label" onChange={handleImageViewer}>
              <CloudDownloadIcon />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>
          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder={authMember?.memberNick}
            value={memberUpdateInput.memberNick}
            name="memberNick"
            onChange={memebrNickHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={authMember?.memberPhone ?? "no phone"}
            value={memberUpdateInput.memberPhone}
            name="memberPhone"
            onChange={memebrPhoneHandler}
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            className={"spec-input  mb-address"}
            type="text"
            placeholder={
              authMember?.memberAddress
                ? authMember.memberAddress
                : "no address"
            }
            value={memberUpdateInput.memberAddress}
            name="memberAddress"
            onChange={memebrAddressHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
            className={"spec-textarea mb-description"}
            placeholder={
              authMember?.memberDesc ? authMember.memberDesc : "no decribtion"
            }
            value={memberUpdateInput.memberDesc}
            name="memberDesc"
            onChange={memebrDescHandler}
          />
        </div>
      </Box>
      <Box className={"save-box"}>
        <Button variant={"contained"} onClick={handleSubmitButtun}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
