import requests
from bs4 import BeautifulSoup
import pandas as pd
import os
import re
import time
from urllib.parse import urljoin

BASE_URL = "https://www.shardahospital.org"

DOCTOR_URL = BASE_URL + "/doctor"
SPECIALITY_URL = BASE_URL + "/speciality"
HEALTH_LIBRARY_URL = BASE_URL + "/health-library"

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_DIR = os.path.join(BASE_DIR, "data", "raw")
HTML_DIR = os.path.join(RAW_DIR, "html")

os.makedirs(RAW_DIR, exist_ok=True)
os.makedirs(HTML_DIR, exist_ok=True)


def get_soup(url):
    print(f"\nFetching: {url}")

    response = requests.get(
        url,
        headers=HEADERS,
        timeout=30
    )

    response.raise_for_status()

    return BeautifulSoup(response.text, "lxml")


def clean_text(text):
    if not text:
        return ""

    return re.sub(r"\s+", " ", text).strip()


def scrape_doctors():

    print("\n==============================")
    print("SCRAPING DOCTORS")
    print("==============================")

    soup = get_soup(DOCTOR_URL)

    with open(
        os.path.join(HTML_DIR, "doctors.html"),
        "w",
        encoding="utf-8"
    ) as f:
        f.write(str(soup))

    doctors = []

    for link in soup.find_all("a", href=True):

        href = link.get("href", "")
        full_url = urljoin(BASE_URL, href)

        if "/doctor/" not in full_url:
            continue

        parent = link

        for _ in range(6):

            if parent.parent:
                parent = parent.parent

            card_text = clean_text(
                parent.get_text(" ", strip=True)
            )

            if "Book Appointment" in card_text:
                break

        match = re.search(
            r"(Dr\.?\s+[A-Za-z][A-Za-z.\s]+?)(?=\s+(Professor|Associate|Assistant|Head|HOD|Medical|Consultant|Book|View)|$)",
            card_text,
            re.IGNORECASE
        )

        if not match:
            continue

        doctor_name = clean_text(match.group(1))

        remaining = card_text

        remaining = remaining.replace(
            doctor_name, ""
        )

        remaining = remaining.replace(
            "Book Appointment", ""
        )

        remaining = remaining.replace(
            "View Profile", ""
        )

        remaining = clean_text(remaining)

        designation = ""

        designation_patterns = [
            "Professor Emeritus",
            "Medical Superintendent",
            "Head & Senior Consultant",
            "Professor and HOD",
            "Associate Professor",
            "Assistant Professor",
            "Senior Consultant",
            "Consultant",
            "Professor",
            "Dean",
            "HOD",
            "Head"
        ]

        for item in designation_patterns:

            if item.lower() in remaining.lower():

                designation = item
                break

        department = ""

        department_patterns = [
            "Internal Medicine",
            "Institute of Critical Care",
            "Department of Psychiatry",
            "Department of Cardiology",
            "Orthopaedics",
            "Pediatrics",
            "Cardiology",
            "Neurology",
            "Neurosurgery",
            "Dermatology",
            "Pulmonology",
            "Ophthalmology",
            "Gynaecology",
            "Obstetrics",
            "ENT",
            "General Surgery"
        ]

        for item in department_patterns:

            if item.lower() in remaining.lower():

                department = item
                break

        doctors.append({
            "doctor_name": doctor_name,
            "designation": designation,
            "department": department,
            "profile_url": full_url
        })

    unique = {}

    for doctor in doctors:

        key = doctor["profile_url"]

        if key not in unique:
            unique[key] = doctor

    doctors = list(unique.values())

    df = pd.DataFrame(doctors)

    df.to_csv(
        os.path.join(RAW_DIR, "doctors.csv"),
        index=False,
        encoding="utf-8-sig"
    )

    print(f"\nDoctors found: {len(df)}")

    if not df.empty:

        print(
            df[
                [
                    "doctor_name",
                    "designation",
                    "department"
                ]
            ].head(20).to_string(index=False)
        )

    return df


def scrape_doctor_profiles():

    print("\n==============================")
    print("SCRAPING DETAILED DOCTOR PROFILES")
    print("==============================")

    input_file = os.path.join(RAW_DIR, "doctors.csv")
    output_file = os.path.join(RAW_DIR, "doctors_detailed.csv")

    doctors_df = pd.read_csv(input_file)

    detailed = []

    total = len(doctors_df)

    for index, row in doctors_df.iterrows():

        url = str(row["profile_url"])

        print(f"\n[{index + 1}/{total}] {url}")

        try:

            response = requests.get(
                url,
                headers=HEADERS,
                timeout=30
            )

            response.raise_for_status()

            soup = BeautifulSoup(
                response.text,
                "lxml"
            )

            page_text = clean_text(
                soup.get_text(" ", strip=True)
            )

            # --------------------------------
            # NAME
            # --------------------------------

            doctor_name = str(
                row.get("doctor_name", "")
            ).strip()

            # --------------------------------
            # DESIGNATION
            # --------------------------------

            designation = str(
                row.get("designation", "")
            ).strip()

            # --------------------------------
            # DEPARTMENT
            # --------------------------------

            department = str(
                row.get("department", "")
            ).strip()

            # --------------------------------
            # QUALIFICATION
            # --------------------------------

            qualification = ""

            match = re.search(
                r"Qualification:\s*(.*?)(?=\s+Experience:)",
                page_text,
                re.IGNORECASE
            )

            if match:
                qualification = clean_text(
                    match.group(1)
                )

            # --------------------------------
            # EXPERIENCE
            # --------------------------------

            experience = ""

            match = re.search(
                r"Experience:\s*(.*?)(?=\s+Languange:|\s+Language:)",
                page_text,
                re.IGNORECASE
            )

            if match:
                experience = clean_text(
                    match.group(1)
                )

            # --------------------------------
            # LANGUAGE
            # --------------------------------

            language = ""

            match = re.search(
                r"Languange:\s*(.*?)(?=\s+About|\s+Book Appointment)",
                page_text,
                re.IGNORECASE
            )

            if not match:

                match = re.search(
                    r"Language:\s*(.*?)(?=\s+About|\s+Book Appointment)",
                    page_text,
                    re.IGNORECASE
                )

            if match:
                language = clean_text(
                    match.group(1)
                )

            # --------------------------------
            # SPECIALIZATION
            # --------------------------------

            specialization = ""

            match = re.search(
                r"Specialization\s+(.*?)(?=\s+About|\s+Qualification|\s+Awards)",
                page_text,
                re.IGNORECASE
            )

            if match:
                specialization = clean_text(
                    match.group(1)
                )

            # --------------------------------
            # PROFILE DESCRIPTION
            # --------------------------------

            description = ""

            match = re.search(
                r"About\s+(.*?)(?=\s+Book Appointment|\s+Qualification)",
                page_text,
                re.IGNORECASE
            )

            if match:
                description = clean_text(
                    match.group(1)
                )

            # --------------------------------
            # SAVE
            # --------------------------------

            detailed.append({

                "doctor_name": doctor_name,

                "designation": designation,

                "department": department,

                "qualification": qualification,

                "experience": experience,

                "language": language,

                "specialization": specialization,

                "description": description,

                "profile_url": url

            })

            time.sleep(1)

        except Exception as e:

            print(
                f"ERROR: {e}"
            )

            detailed.append({

                "doctor_name": str(
                    row.get("doctor_name", "")
                ),

                "designation": str(
                    row.get("designation", "")
                ),

                "department": str(
                    row.get("department", "")
                ),

                "qualification": "",

                "experience": "",

                "language": "",

                "specialization": "",

                "description": "",

                "profile_url": url

            })

    df = pd.DataFrame(detailed)

    df.to_csv(
        output_file,
        index=False,
        encoding="utf-8-sig"
    )

    print("\n======================================")
    print("DETAILED DOCTOR DATA COMPLETED")
    print("======================================")

    print(
        f"Total doctors: {len(df)}"
    )

    print(
        f"Saved to: {output_file}"
    )

    print("\nPreview:")

    print(
        df.head(10).to_string(index=False)
    )

    return df


def scrape_specialities():

    print("\n==============================")
    print("SCRAPING SPECIALITIES")
    print("==============================")

    soup = get_soup(SPECIALITY_URL)

    with open(
        os.path.join(HTML_DIR, "specialities.html"),
        "w",
        encoding="utf-8"
    ) as f:
        f.write(str(soup))

    specialities = []

    for link in soup.find_all("a", href=True):

        href = link.get("href")
        full_url = urljoin(BASE_URL, href)

        if "/speciality/" not in full_url:
            continue

        name = clean_text(
            link.get_text(" ", strip=True)
        )

        if not name:
            continue

        if name.lower() in [
            "read more",
            "view details",
            "know more"
        ]:
            continue

        specialities.append({
            "speciality": name,
            "url": full_url
        })

    unique = {}

    for item in specialities:

        key = item["url"]

        if key not in unique:
            unique[key] = item

    specialities = list(unique.values())

    df = pd.DataFrame(specialities)

    df.to_csv(
        os.path.join(RAW_DIR, "specialities.csv"),
        index=False,
        encoding="utf-8-sig"
    )

    print(f"\nSpecialities found: {len(df)}")

    if not df.empty:
        print(df.head(20).to_string(index=False))

    return df


def scrape_health_library():

    print("\n==============================")
    print("SCRAPING HEALTH LIBRARY")
    print("==============================")

    soup = get_soup(HEALTH_LIBRARY_URL)

    with open(
        os.path.join(HTML_DIR, "health_library.html"),
        "w",
        encoding="utf-8"
    ) as f:
        f.write(str(soup))

    diseases = []

    for link in soup.find_all("a", href=True):

        href = link.get("href")
        full_url = urljoin(BASE_URL, href)

        if "/health-library/" not in full_url:
            continue

        name = clean_text(
            link.get_text(" ", strip=True)
        )

        if not name:
            continue

        if name.lower() in [
            "read more",
            "view details",
            "know more"
        ]:
            continue

        diseases.append({
            "disease": name,
            "url": full_url
        })

    unique = {}

    for item in diseases:

        key = item["url"]

        if key not in unique:
            unique[key] = item

    diseases = list(unique.values())

    df = pd.DataFrame(diseases)

    df.to_csv(
        os.path.join(RAW_DIR, "health_library.csv"),
        index=False,
        encoding="utf-8-sig"
    )

    print(f"\nHealth conditions found: {len(df)}")

    if not df.empty:
        print(df.head(20).to_string(index=False))

    return df


def main():

    print("\n======================================")
    print("       MEDVERSE DATA SCRAPER")
    print("       SHARDA HOSPITAL")
    print("======================================")

    try:
        scrape_doctors()
    except Exception as e:
        print("\nDoctor scraping error:")
        print(e)

    time.sleep(2)

    try:
        scrape_doctor_profiles()
    except Exception as e:
        print("\nDetailed doctor scraping error:")
        print(e)

    time.sleep(2)

    try:
        scrape_specialities()
    except Exception as e:
        print("\nSpeciality scraping error:")
        print(e)

    time.sleep(2)

    try:
        scrape_health_library()
    except Exception as e:
        print("\nHealth library scraping error:")
        print(e)

    print("\n======================================")
    print("SCRAPING COMPLETED")
    print("======================================")

    print("\nCSV files:")
    print(os.path.join(RAW_DIR))


if __name__ == "__main__":
    main()