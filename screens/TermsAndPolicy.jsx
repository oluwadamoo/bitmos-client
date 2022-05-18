import { View, Text, StyleSheet, Pressable, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'

export default function TermsAndPolicy({ navigation, route }) {
    const [isTerms, setIsTerms] = React.useState(true)
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [acceptPolicy, setAcceptPolicy] = useState(false)

    const auth_token = route?.params?.auth_token;
    // const terms_of_service = require("../assets/termsandcondition/Privacy_policy_for_clients.docx")

    // const privacy_policy = require("../assets/termsandcondition/Privacy_policy_for_clients.docx")

    const toggleHeader = (name) => {
        if (name == "terms") {
            setIsTerms(true)
        } else {
            setIsTerms(false)
        }
    }

    const policy = [{
        title: "Usage of service",
        desc: `For a user to interact with our servers, website, mobile apps and services, the user has to provide personal information such as full name, email address, residential address, business address etc. and credit card details. This information will be used to process business and monetary transitions between a Customer referred herein as ‘Client’ and a Service Provider referred herein as ‘Bytmospartner’.\n\n`
    },
    {
        title: "Privacy Policy and Protection",
        desc: `This privacy policy and protection governs the manner in which the website collects, uses, maintains and discloses information collected from users of the website. The privacy policy and protection applies to the Site and all products and services offered by the company\n\n`,

    },
    {
        title: "Personal Identification Information",
        desc: `We may collect personal information from Users or our website in several ways including when Users visit our site, register on the site, subscribe to the newsletter, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, email address. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personal identification information except that it may prevent them from in certain Site related activities.\n\n`
    },
    {
        title: "Non-personal Identification Information",
        desc: `We may non-personal identification information about users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our site, such as the operating system and the internet service providers’ utilized and other similar information\n\n`
    },
    {
        title: "How we use collected information",
        desc: `Bytmos may collect User personal information for the following purposes:
        •	To personalise User experience
        We may use User information to understand how our Users as individuals and as a group use and interact with our services on the Site
        •	To send periodic emails 
        We may use email addresses of Users to send information and updates pertaining their service requests and renderings. Users are allowed to unsubscribe from our email system only that it will reduce the effectiveness and efficiency of our services to them.
        •	To improve customer service
        Information provided to us by Users help to respond to Users’ customer service request efficiently.\n\n`
    },
    {
        title: "Privacy Protection",
        desc: `User account information will be protected with passwords and audits will be performed annually to make sure that the handling of user credit card information is in line with the industry guidelines. However users are advised to be discrete enough not to reveal any of their personal information to any other party and on accounts what so ever.\n\n`
    },
    {
        title: "Sharing Users personal information",
        desc: `We do not sell, trade or rent Users personal identification personal information to others or any third party individual. We may share generic demographic information not linked to any personal identification information regarding visitors and users with any third party individual or website.\n\n`
    },
    {
        title: "Third party",
        desc: `Users may find advertising or other content on our Site that link to the sites and services of our partners, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices or rules and regulations guiding the websites liked to or from our site. These websites and services may have their own privacy policies and Users browsing or interacting with these sites are subject to the website’s own terms and conditions.\n\n`
    },
    {
        title: "Change to this privacy policy",
        desc: `Bytmos as a company has the discretion to update this privacy policy at any time. When we do, we will revise the update date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed on how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of the modifications.\n\n`
    },
    {
        title: "Your acceptance of these terms",
        desc: `By using this site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of our Site following the posting and updates to this policy will be deemed your acceptance of those changes.\n\n`
    }

    ]

    const terms = [
        {
            title: "",
            desc: `These Terms of Use (“Agreement”) constitute a legally binding agreement made between you, whether personally or on behalf of an entity and Bytmos (“we” or “us”) concerning your access to and use of the Bytmos platform and the services we offer. These Terms of use governs your use of Bytmos and provide information about Bytmos outlined below-when you create an account or use Bytmos, you agree to these terms. \n
The Bytmos terms of use is provided to you by Bytmos. These Terms of use therefore constitute an agreement between you and Bytmos. \n
1.0. In order to use this service, you must first agree to the Terms.  You may not use this service if you do not accept the Terms. \n
1.1. You can accept the Terms by simply using the service. You understand and agree that we will treat your use of this service as acceptance of the Terms from that point onwards. 
`
        },
        {
            title: "Members Conduct: You agree not to use the service to:",
            desc: `	
            i.	Obtain or attempt unauthorized access to the services or Oath service, systems, network or data service. \n
            ii.	Make available any content that is harmful to other users, abusive, \n
            iii.	Violate any applicable laws or regulation. \n
            iv.	Manipulate or impersonate any person or entity under the guise of a servitor or user. \n
            v.	Make available virus or any other or content designed to interrupt, destroy or limit the functionality of the service or affect other users. \n
            vi.	Interfere or disrupt the services of other servitors & User in any way. \n
            You can contact us with feedback and Concerns here or by emailing us at Bytmos.com. \n
            Any claims arising out of or relating to these terms or the services will be governed by the laws of Nigeria; all disputes related to these Terms of the Service will be brought solely in the magistrate, state or courts located in Nigeria, depending on the parties involved and nature of claim; and you consent to personal jurisdiction in these courts. \n
            You have the right under Nigerian and certain other privacy and data protection laws as may be applicable to request free of charge. \n
            •	Access to and correction and deletion of your personal information. \n
            •	Restriction of our processing of your personal information or to object to our processing and/or \n
            •	Portability of your information \n
            If you wish to exercise any of these rights, please contact us through the contact address provided below. We will respond to your request consistent with applicable laws. To protect your privacy and security, we may require you to verify your identity.\n\n
            `
        },
        {
            title: "Pricing",
            desc: `The cost of services on the Bytmos platform shall be stated by the Bytmospartner which are payable by Clients requesting for services. Prices on services may vary based on the quantity of services been requested by the Clients per time. \n\n`
        },
        {
            title: "FEES",
            desc: `Clients on the Bytmos platform will not be charged any extra fees on the platform apart from the charges on the pricings on the service sold on the platform and the VAT charges with a flat rate of 7.5% of each service is been purchased.\n\n`
        },
        {
            title: "Payment Policy",
            desc: `Only electronic payments are allowed, in a case where a Client and a Bytmospartner try to engage in physical cash transition, both parties will bear on their own terms any damage(s) that result in the process.
            Payments will be made using credit and master cards via the various payment gateways provided by our service.\n\n`
        },
        {
            title: "Abuse",
            desc: `In a case where a User tries to abuse the use of our service, either by posting unethical advertisements, false identities or attempted fraud, the user will be immediately and completely removed from our service without a refund of any cash wish may have already been deposited by such person and will also solely bare any penalty from law enforcement personnel. \n
            In any case where a C is reported by the other party has been inconsistent, incompetent or verbally abusive on two or more occasions, such person will be removed immediately and completely from our service without a refund of any cash which may have already been deposited by such person.\n\n
            `
        },
        {
            title: 'DISCLAIMER',
            desc: `The information available through the site is provided solely for informational purposes on an “as is” basis at user’s sole risk. Bytmos makes no guarantees as to the accurateness, quality, or completeness of the information and Bytmos shall not be responsible or liable for any errors, omissions, or inaccuracies in the information or for any user’s reliance on the information. User is solely responsible for verifying the information as being appropriate for user’s personal uses.
            We are not liable for third party content; neither do we endorse content uploaded by users which other users may find offensive. We also are not responsible for mistakes and typos, or our website provides for no warranties or guarantees. \n
            Nothing in this website, therefore, shall be considered a professional advice. We work hard to provide the best products we can and to specify clear guidelines for everyone who uses them. Our products and services however are provided “as is” and we make no guarantees that they always will be safe, secure, or error-free or that they will function without disruption, delays or imperfections. To the extent permitted by law, we also Disclaim all warranties, whether express or implied including the implied  warranties of merchantability, fitness for a particular purpose, title, and non- infringement.\n
            We cannot predict when issues might arise with our products. Accordingly our liability shall be limited to the fullest extent permitted by applicable law, and under no circumstance will we be liable to you for any lost profits, revenues, information, or data damages arising out of or related to these terms. \n
            No warranties; exclusion of liability; indemnification. Our site is operated on an “as is,” as available” basis, without representations or warranties of any kind. To the fullest extent permitted by law, specifically disclaims all warranties and conditions of any kind, including all implied warranties and conditions can be purchased. \n
            We may amend this agreement at any time by posting the amended terms on our site. We may or may not post notices on the homepage of our site when such changes occur.
            `
        }
    ]

    const gotoOtp = () => {
        if (acceptTerms && acceptPolicy) {
            navigation.push("Verify Otp Sent To Email", {
                auth_token: auth_token,
            })
        } else {
            alert("Please accept Terms and Policy to continue!")
        }
    }
    return (
        <View style={styles.container}>

            <View style={styles.top}>
                <Pressable onPress={() => toggleHeader("terms")} style={[styles.headerButton, { backgroundColor: !isTerms ? "#fff" : "#00709e" }]}><Text style={{ fontWeight: "700", fontSize: 15, color: isTerms ? "#fff" : "#000" }}>Terms</Text></Pressable>
                <Pressable onPress={() => toggleHeader("policy")} style={[styles.headerButton, { backgroundColor: isTerms ? "#fff" : "#00709e" }]}><Text style={{ fontWeight: "700", fontSize: 15, color: isTerms ? "#000" : "#fff" }}>Privacy</Text></Pressable>
            </View>

            <ScrollView style={[styles.body]}>
                <View style={{ padding: 15 }}>
                    <Text style={styles.title}>{isTerms ? "Terms of Service" : "Bytmos Privacy Policy"}</Text>

                    <View style={styles.body_content}>
                        {
                            isTerms ? terms.map((term, i) => (
                                <View key={i}>
                                    <Text style={styles.content_t}>{term.title}</Text>
                                    <Text style={styles.content_desc}>{term.desc}</Text>
                                </View>
                            )) : policy.map((p, i) => (
                                <View key={i}>
                                    <Text style={styles.content_t}>{p.title}</Text>
                                    <Text style={styles.content_desc}>{p.desc}</Text>
                                </View>
                            ))
                        }
                    </View>

                    <View style={styles.body_footer}>
                        <Text style={{ fontStyle: "italic", textAlign: "center", fontWeight: "500" }}>{isTerms ? "We last updated our Terms of Service on 12 June, 2022" : "We last updated our Privacy Policy and Terms of Use on 12 February, 2022"}</Text>
                    </View>
                </View>
                <View style={{ height: 50 }} />
            </ScrollView>
            <View style={styles.footer}>
                <Pressable onPress={() => setAcceptTerms(!acceptTerms)} style={({ pressed }) => [styles.agree, { opacity: pressed ? .3 : 1 }]}><View style={styles.dot_cont}><View style={{ backgroundColor: acceptTerms ? "#00709e" : "transparent", width: 12, height: 12, borderRadius: 15 }} /></View><Text>I accept the Terms of Service</Text></Pressable>
                <Pressable onPress={() => setAcceptPolicy(!acceptPolicy)} style={({ pressed }) => [styles.agree, { opacity: pressed ? .3 : 1 }]}><View style={styles.dot_cont}><View style={{ backgroundColor: acceptPolicy ? "#00709e" : "transparent", width: 12, height: 12, borderRadius: 15 }} /></View><Text>I consent to the Privacy Policy</Text></Pressable>

                <Pressable onPress={gotoOtp} style={({ pressed }) => [styles.headerButton, { height: 50, opacity: pressed ? .5 : 1, width: Dimensions.get("screen").width - 20, borderRadius: 12, marginTop: 20 }]}><Text style={{ color: "#fff", fontWeight: "700" }}>Continue</Text></Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 15,
        paddingHorizontal: 10
    },
    top: {
        borderColor: "#bababa",
        borderWidth: 1,
        height: 50,
        borderRadius: 27,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    headerButton: {
        backgroundColor: "#00709e",
        height: 40,
        width: (Dimensions.get("screen").width / 2) - 20,
        borderRadius: 27,
        alignItems: "center",
        justifyContent: "center"
    },
    body: {


        borderBottomColor: "#c6c6c6",
        borderBottomWidth: 1,

    },
    title: {
        fontSize: 16,
        fontWeight: "700"
    },
    body_content: {

    },
    content_t: {
        fontSize: 16,
        fontWeight: "700"
    },
    content_desc: {
        fontSize: 14.5
    },
    footer: {


        paddingVertical: 20,


    },
    agree: {
        borderColor: "#bababa",
        borderWidth: 1,
        flexDirection: 'row',
        height: 40,
        width: (Dimensions.get("screen").width) - 20,
        borderRadius: 10,
        alignItems: "center",
        // justifyContent: "center",
        marginBottom: 20,
        paddingHorizontal: 16

    },
    dot_cont: {
        borderColor: "#00709e",
        borderWidth: 1.5,
        height: 20,
        width: 20,
        borderRadius: 20,
        marginRight: 20,
        alignItems: "center",
        justifyContent: "center"
    }
})