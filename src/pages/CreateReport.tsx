import { useState, useEffect } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import NavBar from '../components/NavBar';
import CustomInput from '../components/customEl/CustomInput';
import BottomBar from '../components/BottomBar';
import { Typography } from '@mui/joy';
import preview_image from "../assets/preview.png"
import { useNavigate } from 'react-router-dom';
import { ReportValueSchema } from '../types/allTypes';


interface reportValuesState {
    [key: string]: string;
}
interface reportErrorsState {
    [key: string]: string;
}

const mockTemplateList: ReportValueSchema[] = [
    {
        placeholder: "{Price}",
        Name: "Price",
        type: "number",
    },
    {
        placeholder: "{ActivitiesList}",
        Name: "ActivitiesList",
        type: "text"
    },
]

export default function CreateReport() {
    const navHeight = "80px"
    const navigate = useNavigate()

    const [reportValues, setReportValues] = useState<reportValuesState>({})
    const [reportErrors, setReportErrors] = useState<reportErrorsState>({})

    const handlePassInputProps = (valueKey: string | number) => {
        const setValue = (value: string) => setReportValues((valueProp) => {
            return { ...valueProp, [valueKey]: value }
        })
        const setError = (value: string) => setReportErrors((valueProp) => {
            return { ...valueProp, [valueKey]: value }
        })

        return {
            value: reportValues[valueKey],
            setValue: setValue,
            error: reportErrors[valueKey],
            setError: setError
        }
    }

    const handleCheckIsAnyErrors = (obj: reportErrorsState): boolean => {
        return Object.values(obj).every(value => value === "");
    }

    const alertObjectValuesInColumns = (obj: reportValuesState): void => {
        const values = Object.values(obj).join('\n');
        alert(values);
    }

    const handleSubmitValues = () => {
        if (!handleCheckIsAnyErrors(reportErrors)) {
            alert("Fields not valid!")
        } else {
            alertObjectValuesInColumns(reportValues)
            navigate("/")
        }
    }

    useEffect(() => {
        setReportValues(
            () => {
                const resObj: reportValuesState = {}
                mockTemplateList.forEach((el: ReportValueSchema) => {
                    resObj[el.Name] = el.type === "number" ? "0" : ""
                })

                return resObj
            }
        )
        setReportErrors(
            () => {
                const resObj: reportErrorsState = {}
                mockTemplateList.forEach((el: ReportValueSchema) => {
                    resObj[el.Name] = ""
                })

                return resObj
            }
        )
    }, [])

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ height: "100dvh" }}>
                <Box sx={{
                    height: navHeight
                }}>
                    <NavBar />
                </Box>

                <Box
                    component="main"
                    sx={{
                        flex: "1",
                        display: "flex",
                        justifyContent: "space-between",
                        height: `calc(100% - ${navHeight} * 2)`
                    }}
                >
                    <Stack spacing={2} sx={{
                        px: { xs: 2, md: 4 },
                        pt: 3,
                        pb: 3,
                        minHeight: 0,
                        width: "40%",
                        borderRight: '1px solid',
                        borderColor: 'divider',
                    }}>
                        <Stack spacing={2} sx={{ overflow: 'auto' }}>
                            <Box sx={{ pb: "5px" }}>
                                <Typography level="h4">Fill in deliverable variables</Typography>
                                <Typography color='neutral' level="title-sm">Further instructions in one line</Typography>
                            </Box>


                            {Object.keys(reportValues).length !== 0 && mockTemplateList.map((el: ReportValueSchema, index: number) =>
                                <CustomInput
                                    {...handlePassInputProps(el.Name)}
                                    {...el}
                                    key={`CI_${index}`} />)}
                        </Stack>
                    </Stack>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: "center",
                            width: "60%",
                            height: "100%"
                        }}
                    >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: "#F1F3F5",
                            height: "calc(100% - 40px)",
                            aspectRatio: "595 / 842",
                            borderRadius: "12px"
                        }}>
                            <Typography color='neutral' level="title-sm" sx={{ p: "10px 0px" }}>Preview</Typography>

                            <img src={preview_image} style={{ height: "88%", aspectRatio: "595 / 842" }} />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    height: navHeight
                }}>
                    <BottomBar onGenerate={handleSubmitValues} />
                </Box>
            </Box>
        </CssVarsProvider>
    );
}
