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
import { tokens as TK } from "@/store/slice/auth-slice";
import { loading as LD, imagePath as IP } from "@/store/slice/auth-slice";
import { IUpdateUserPayload } from "@/types/auth.type";
import ImageCropper from "../cropper/image-cropper";
import Image from "next/image";
import NextImage from "next/image";
import { getPhoto } from "../../configs/api-config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createPlayer, updatePlayer } from "@/store/slice/player-slice";
import {
  fetchTournaments,
  tournaments as TD,
} from "../../store/slice/tournament-slice";
import {
  ICreatePlayerPayload,
  IPlayer,
  IUpdatePlayerPayload,
} from "@/types/player.type";

type TProps = {
  show: boolean;
  onHide: () => void;
  type: "ADD" | "VIEW" | "EDIT";
  data?: IPlayer;
};

const initialValues = {
  tnid: "",
  name: "",
  sname: "",
  mobile: "",
  status: "",
};

const PlayerModal = (props: TProps) => {
  const { show, onHide, type, data } = props;
  const [operation, setOperation] = useState("Add");
  const user = useSelector(UD);
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [showImageError, setShowImageError] = useState(false);
  const loading = useSelector(LD);
  const token = useSelector(TK);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const imagePath = useSelector(IP);
  const tournaments = useSelector(TD);
  const statusType = ["Active", "Inactive"];
  const validationSchema = object().shape({
    tnid: string().required("Required"),
    name: string().required("Required"),
    sname: string().required("Required"),
    mobile: string().required("Required"),
    status: string().required("Required"),
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
          const payload: ICreatePlayerPayload = {
            ...formik.values,
            image: file,
          };
          console.log(file, "file");
          const res = await dispatch(
            createPlayer({ payload, headers })
          ).unwrap();
          if (res.success) {
            onHide();
          }
        }
      } else {
        if (croppedImage) {
          const payload: IUpdatePlayerPayload = {
            ...formik.values,
            image: file,
          };
          console.log(file, "file");
          const res = await dispatch(
            updatePlayer({ payload, id: data?.pid as string, headers })
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

  const fetchTournamentData = async () => {
    try {
      const data = await dispatch(fetchTournaments(headers)).unwrap();
    } catch (error) {}
  };
  useEffect(() => {
    fetchTournamentData();
  }, []);
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
            tnid: data.tnid,
            name: data.name,
            sname: data.sname,
            mobile: data.mobile,
            status: data.status,
          });
          setCroppedImage(getPhoto(imagePath as string, data?.image as string));
        }
        setOperation("Edit");
        break;
      case "VIEW":
        if (data) {
          formik.setValues({
            tnid: data.tnid,
            name: data.name,
            sname: data.sname,
            mobile: data.mobile,
            status: data.status,
          });
          setCroppedImage(getPhoto(imagePath as string, data?.image as string));
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
      }}
      size="2xl"
    >
      <ModalContent>
        <ModalHeader>
          <h1>{operation} Player</h1>
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
                  <Select
                    label="Select a tournament id"
                    className="max-w-xs"
                    selectedKeys={[formik.values.tnid]}
                    name="tnid"
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
                    isDisabled={type === "VIEW"}
                  >
                    {tournaments ? (
                      tournaments.map((tournament) => (
                        <SelectItem
                          key={tournament.tnid as string}
                          value={tournament.tnid}
                        >
                          {tournament.title}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem key={"Select"} value={"Select"}>
                        Select
                      </SelectItem>
                    )}
                  </Select>
                  {/* <Input
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
                  /> */}
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
                    id="sname"
                    name="sname"
                    label="S Name"
                    value={formik.values.sname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.sname && formik.touched.sname) as boolean
                    }
                    errorMessage={
                      formik.errors.sname &&
                      formik.touched.sname &&
                      formik.errors.sname
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>

                <div>
                  <Input
                    type="number"
                    id="mobile"
                    name="mobile"
                    label="Mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.mobile && formik.touched.mobile) as boolean
                    }
                    errorMessage={
                      formik.errors.mobile &&
                      formik.touched.mobile &&
                      formik.errors.mobile
                    }
                    disabled={type === "VIEW"}
                    // disabled={!isEditable}
                  />
                </div>
                <div>
                  <Select
                    label="Select a status"
                    className="max-w-xs"
                    selectedKeys={[formik.values.status]}
                    name="status"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.status && formik.touched.status) as boolean
                    }
                    errorMessage={
                      formik.errors.status &&
                      formik.touched.status &&
                      formik.errors.status
                    }
                    isDisabled={type === "VIEW"}
                  >
                    {statusType.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </Select>
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

export default PlayerModal;
