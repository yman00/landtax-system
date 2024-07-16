import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import DialogForm from "../common/ui/DialogForm";
import FlexRow from "../common/ui/FlexRow";

const UpdateUserDialog = ({
  open,
  onClose,
  setUsers,
  setResMsg,
  setSnack,
  setSeverity,
  updateUserId,
  updateFname,
  updateLname,
  updateMname,
  updateEmail,
  setUpdateFname,
  setUpdateLname,
  setUpdateMname,
  setUpdateEmail,
  setUpdatePwd,
  updatePwd,
  setUpdateUserId,
  updateGender,
  setUpdateGender,
  updateAddress,
  setUpdateAddress,
  updateContactNo,
  setUpdateContactNo,
}) => {
  const [pwdVisible, setPwdVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setDisabled(true);

    if (updateFname.length < 2 || updateLname.length < 2) {
      setResMsg("first and last name should be at least 2 characters");
      setSeverity("error");
      setSnack(true);
      setDisabled(false);
      return;
    }

    if (updatePwd && updatePwd.length < 8) {
      setResMsg("Password should be at least 8 characters");
      setSeverity("error");
      setSnack(true);
      setDisabled(false);
      return;
    }

    try {
      const response = await axiosPrivate.put("users", {
        id: updateUserId,
        firstname: updateFname.trimStart().trimEnd(),
        lastname: updateLname.trimStart().trimEnd(),
        middlename: updateMname?.trimStart()?.trimEnd(),
        email: updateEmail.trimStart().trimEnd(),
        password: updatePwd?.trimStart()?.trimEnd(),
        contactNo: updateContactNo?.trimStart()?.trimEnd(),
        address: updateAddress?.trimStart()?.trimEnd(),
        gender: updateGender,
      });

      setUsers((prev) => {
        return prev.map((data) => {
          if (data._id == updateUserId) {
            return response.data?.result;
          }
          return data;
        });
      });

      setResMsg(response?.data?.success);
      setSeverity("success");
      setSnack(true);
    } catch (error) {
      setSeverity("error");
      if (!error?.response) {
        setResMsg("No Server Response");
      } else if (error?.response?.status == 304) {
        setSeverity("warning");
        setResMsg(`No changes for user with email: ${updateEmail}`);
      } else if (error?.response?.status == 409) {
        setResMsg("Email address is already use");
      } else {
        setResMsg("Request Failed");
      }
      setSnack(true);
    }

    setUpdateUserId("");
    setUpdateFname("");
    setUpdateLname("");
    setUpdateMname("");
    setUpdateEmail("");
    setUpdatePwd("");
    setUpdateGender("");
    setUpdateAddress("");
    setUpdateContactNo("");
    onClose(false);
    setDisabled(false);
  };

  return (
    <DialogForm
      title="Edit User's Info"
      onSubmit={handleUpdateUser}
      open={open}
      onClose={() => {
        onClose(false);
        setPwdVisible(false);
      }}
      actions={
        <>
          <Button
            disabled={disabled}
            variant="outlined"
            size="small"
            onClick={() => onClose(false)}
          >
            cancel
          </Button>
          <Button
            disabled={disabled}
            variant="contained"
            size="small"
            type="submit"
          >
            Submit
          </Button>
        </>
      }
      disableAutoFocus
    >
      <FlexRow>
        <TextField
          disabled={disabled}
          required
          autoFocus
          margin="dense"
          id="fname"
          label="First name"
          type="text"
          fullWidth
          variant="outlined"
          value={updateFname}
          onChange={(e) => setUpdateFname(e.target.value)}
        />
        <TextField
          disabled={disabled}
          required
          margin="dense"
          id="lname"
          label="Last name"
          type="text"
          fullWidth
          variant="outlined"
          value={updateLname}
          onChange={(e) => setUpdateLname(e.target.value)}
        />
        <TextField
          disabled={disabled}
          margin="dense"
          id="mname"
          label="Middle name"
          type="text"
          fullWidth
          variant="outlined"
          value={updateMname}
          onChange={(e) => setUpdateMname(e.target.value)}
        />
      </FlexRow>

      <FlexRow>
        <FormControl fullWidth margin="dense">
          <InputLabel id="gender">Sex</InputLabel>
          <Select
            labelId="gender"
            id="gender"
            value={updateGender}
            label="Gender"
            onChange={(e) => setUpdateGender(e.target.value)}
            required
            disabled={disabled}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </Select>
        </FormControl>

        <TextField
          disabled={disabled}
          required
          margin="dense"
          id="address"
          label="Address"
          type="text"
          variant="outlined"
          fullWidth
          value={updateAddress}
          onChange={(e) => setUpdateAddress(e.target.value)}
        />
        <TextField
          disabled={disabled}
          required
          margin="dense"
          id="contact"
          label="Contact number"
          type="text"
          variant="outlined"
          fullWidth
          value={updateContactNo}
          onChange={(e) => setUpdateContactNo(e.target.value)}
        />
      </FlexRow>

      <FlexRow>
        <TextField
          disabled={disabled}
          required
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          variant="outlined"
          fullWidth
          value={updateEmail}
          onChange={(e) => setUpdateEmail(e.target.value)}
        />

        <FormControl fullWidth variant="outlined" margin="dense" sx={{ mt: 1 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            disabled={disabled}
            id="pwd"
            type={pwdVisible ? "text" : "password"}
            value={updatePwd}
            onChange={(e) => setUpdatePwd(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  disabled={disabled}
                  edge="end"
                  onClick={() => setPwdVisible(!pwdVisible)}
                >
                  {pwdVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </FlexRow>
    </DialogForm>
  );
};

export default UpdateUserDialog;
