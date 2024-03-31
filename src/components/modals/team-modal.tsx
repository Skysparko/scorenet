import { useAppDispatch } from "@/store/hooks";
import { user as UD, updateUser } from "@/store/slice/auth-slice";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { date, object, ref, string } from "yup";
import { loading as LD, imagePath as IP } from "@/store/slice/auth-slice";
import { IUpdateUserPayload } from "@/types/auth.type";
import ImageCropper from "../cropper/image-cropper";
import Image from "next/image";
import NextImage from "next/image";
import { getPhoto } from "../../configs/api-config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTeam, updateTeam } from "@/store/slice/team-slice";
import {
  ICreateTeamPayload,
  ITeam,
  IUpdateTeamPayload,
} from "@/types/team.type";

type TProps = {
  show: boolean;
  onHide: () => void;
  type: "ADD" | "VIEW" | "EDIT";
  data?: ITeam;
};

const initialValues = {
  tnid: "",
  name: "",
  s_name: "",
  group: "",
  tmatch: "",
  pmatch: "",
  win: "",
  lose: "",
  tie: "",
  rating: "",
  point: "",
  color: "",
};

const TeamModal = (props: TProps) => {
  const { show, onHide, type, data } = props;
  const [operation, setOperation] = useState("Add");
  const user = useSelector(UD);
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [showImageError, setShowImageError] = useState(false);
  const loading = useSelector(LD);
  const imagePath = useSelector(IP);

  const validationSchema = object().shape({
    tnid: string().required("Required"),
    name: string().required("Required"),
    s_name: string().required("Required"),
    group: string().required("Required"),
    tmatch: string().required("Required"),
    pmatch: string().required("Required"),
    win: string().required("Required"),
    lose: string().required("Required"),
    tie: string().required("Required"),
    rating: string().required("Required"),
    point: string().required("Required"),
    color: string().required("Required"),
  });

  const formik = useFormik({
    initialValues: { ...initialValues },
    validationSchema,
    onSubmit: handleSubmit,
  });
  const dispatch = useAppDispatch();
  async function handleSubmit() {
    try {
      if (type === "ADD") {
        if (croppedImage) {
          const payload: ICreateTeamPayload = {
            ...formik.values,
            image: file,
          };
          console.log(file, "file");
          const res = await dispatch(createTeam(payload)).unwrap();
          if (res.success) {
            onHide();
          }
        }
      } else {
        if (croppedImage) {
          const payload: IUpdateTeamPayload = {
            ...formik.values,
            image: file,
          };
          console.log(file, "file");
          const res = await dispatch(
            updateTeam({ payload, id: data?.tmid as string })
          ).unwrap();
          if (res.success) {
            onHide();
          }
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  console.log("Team", croppedImage, data);
  useEffect(() => {
    switch (type) {
      case "ADD":
        setOperation("Add");
        setCroppedImage("");
        formik.resetForm();
        break;
      case "EDIT":
        if (data) {
          formik.setValues({
            tnid: data?.tnid,
            name: data?.name,
            s_name: data?.s_name,
            group: data?.group,
            tmatch: data?.tmatch,
            pmatch: data?.pmatch,
            win: data?.win,
            lose: data?.lose,
            tie: data?.tie,
            rating: data?.rating,
            point: data?.point,
            color: data?.color,
          });
          setCroppedImage(getPhoto(imagePath as string, data?.logo as string));
        }
        setOperation("Edit");
        break;
      case "VIEW":
        if (data) {
          formik.setValues({
            tnid: data?.tnid,
            name: data?.name,
            s_name: data?.s_name,
            group: data?.group,
            tmatch: data?.tmatch,
            pmatch: data?.pmatch,
            win: data?.win,
            lose: data?.lose,
            tie: data?.tie,
            rating: data?.rating,
            point: data?.point,
            color: data?.color,
          });
          console.log("view", data?.logo);
          setCroppedImage(getPhoto(imagePath as string, data?.logo as string));
        }
        setOperation("My");
        break;
    }
  }, [type, show]);

  return (
    <Modal
      backdrop={"blur"}
      className={`rounded-3xl p-5 max-xs:px-0 text-black`}
      isKeyboardDismissDisabled={true}
      isDismissable={false}
      isOpen={show}
      onClose={() => {
        onHide();
        // setCroppedImage("")
        // setIsEditable(false);
      }}
      size="2xl"
    >
      <ModalContent>
        <ModalHeader>
          <h1>{operation} Team</h1>
        </ModalHeader>
        <form
          onSubmit={(e) => {
            !croppedImage && setShowImageError(true);
            formik.handleSubmit(e);
          }}
        >
          <ModalBody className="">
            <>
              {type === "VIEW" ? (
                <div className="w-[100px] h-[100px] overflow-hidden m-auto border  rounded-xl shadow ">
                  <Image
                    src={croppedImage}
                    alt="Cropped"
                    height={100}
                    width={100}
                  />
                </div>
              ) : (
                <ImageCropper
                  croppedImage={croppedImage}
                  setCroppedImage={setCroppedImage}
                  showImageError={showImageError}
                  setShowImageError={setShowImageError}
                  setFile={setFile}
                />
              )}

              <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
                <div>
                  <Input
                    type="text"
                    id="tnid"
                    name="tnid"
                    label="Tournament ID"
                    value={formik.values.tnid}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.tnid && formik.touched.tnid) as boolean
                    }
                    errorMessage={
                      formik.errors.tnid &&
                      formik.touched.tnid &&
                      formik.errors.tnid
                    }
                    disabled={type === "VIEW"}
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.name && formik.touched.name) as boolean
                    }
                    errorMessage={
                      formik.errors.name &&
                      formik.touched.name &&
                      formik.errors.name
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    id="s_name"
                    name="s_name"
                    label="S Name"
                    value={formik.values.s_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.s_name && formik.touched.s_name) as boolean
                    }
                    errorMessage={
                      formik.errors.s_name &&
                      formik.touched.s_name &&
                      formik.errors.s_name
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    id="group"
                    name="group"
                    label="Group"
                    value={formik.values.group}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.group && formik.touched.group) as boolean
                    }
                    errorMessage={
                      formik.errors.group &&
                      formik.touched.group &&
                      formik.errors.group
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="tmatch"
                    name="tmatch"
                    label="T Match"
                    value={formik.values.tmatch}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.tmatch && formik.touched.tmatch) as boolean
                    }
                    errorMessage={
                      formik.errors.tmatch &&
                      formik.touched.tmatch &&
                      formik.errors.tmatch
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="pmatch"
                    name="pmatch"
                    label="P Match"
                    value={formik.values.pmatch}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.pmatch && formik.touched.pmatch) as boolean
                    }
                    errorMessage={
                      formik.errors.pmatch &&
                      formik.touched.pmatch &&
                      formik.errors.pmatch
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="win"
                    name="win"
                    label="Win"
                    value={formik.values.win}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.win && formik.touched.win) as boolean
                    }
                    errorMessage={
                      formik.errors.win &&
                      formik.touched.win &&
                      formik.errors.win
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="lose"
                    name="lose"
                    label="Lose"
                    value={formik.values.lose}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.lose && formik.touched.lose) as boolean
                    }
                    errorMessage={
                      formik.errors.lose &&
                      formik.touched.lose &&
                      formik.errors.lose
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="tie"
                    name="tie"
                    label="Tie"
                    value={formik.values.tie}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.tie && formik.touched.tie) as boolean
                    }
                    errorMessage={
                      formik.errors.tie &&
                      formik.touched.tie &&
                      formik.errors.tie
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="rating"
                    name="rating"
                    label="Rating"
                    value={formik.values.rating}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.rating && formik.touched.rating) as boolean
                    }
                    errorMessage={
                      formik.errors.rating &&
                      formik.touched.rating &&
                      formik.errors.rating
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="point"
                    name="point"
                    label="Point"
                    value={formik.values.point}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.point && formik.touched.point) as boolean
                    }
                    errorMessage={
                      formik.errors.point &&
                      formik.touched.point &&
                      formik.errors.point
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="color"
                    name="color"
                    label="Color"
                    value={formik.values.color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.color && formik.touched.color) as boolean
                    }
                    errorMessage={
                      formik.errors.color &&
                      formik.touched.color &&
                      formik.errors.color
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>
              </div>
            </>
          </ModalBody>
          <ModalFooter className="flex justify-between">
            {type !== "VIEW" && (
              <Button color="primary" type="submit" isLoading={loading}>
                <span>Submit</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 rtl:-scale-x-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            )}

            <Button
              color="danger"
              onClick={() => {
                onHide();
                // setCroppedImage("")
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TeamModal;
