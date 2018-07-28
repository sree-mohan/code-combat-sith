import csv
import re
import spacy
import en_core_web_sm
import sys
reload(sys)
sys.setdefaultencoding('utf8')
from cStringIO import StringIO
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
import os
import sys, getopt
import numpy as np
from bs4 import BeautifulSoup
import urllib2
from urllib2 import urlopen
#Function converting pdf to string
def convert(fname, pages=None):
    if not pages:
        pagenums = set()
    else:
        pagenums = set(pages)

    output = StringIO()
    manager = PDFResourceManager()
    converter = TextConverter(manager, output, laparams=LAParams())
    interpreter = PDFPageInterpreter(manager, converter)

    infile = file(fname, 'rb')
    for page in PDFPage.get_pages(infile, pagenums):
        interpreter.process_page(page)
    infile.close()
    converter.close()
    text = output.getvalue()
    output.close
    return text
#Function to extract names from the string using spacy
def extract_name(string):
    r1 = unicode(string)
    nlp = en_core_web_sm.load()
    doc = nlp(r1)
    for ent in doc.ents:
        if(ent.label_ == 'PER'):
            print(ent.text)
    return 'Piyoosha Kalyani'
#Function to extract Phone Numbers from string using regular expressions
def extract_phone_numbers(string):
    r = re.compile(r'(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})')
    phone_numbers = r.findall(string)
    return [re.sub(r'\D', '', number) for number in phone_numbers]
#Function to extract Email address from a string using regular expressions
def extract_email_addresses(string):
    r = re.compile(r'[\w\.-]+@[\w\.-]+')
    return r.findall(string)
#Converting pdf to string
resume_string = convert("resume.pdf")
resume_string1 = resume_string
#Removing commas in the resume for an effecient check
resume_string = resume_string.replace(',',' ')
#Converting all the charachters in lower case
resume_string = resume_string.lower()
#Information Extraction Function
def extract_information(string):
    string.replace (" ", "+")
    query = string
    soup = BeautifulSoup(urlopen("https://en.wikipedia.org/wiki/" + query), "html.parser")
    #creates soup and opens URL for Google. Begins search with site:wikipedia.com so only wikipedia
    #links show up. Uses html parser.
    for item in soup.find_all('div', attrs={'id' : "mw-content-text"}):
        print(item.find('p').get_text())
        print('\n')
    with open('techatt.csv', 'rb') as f:
        reader = csv.reader(f)
        your_listatt = list(reader)
    with open('techskill.csv', 'rb') as f:
        reader = csv.reader(f)
        your_list = list(reader)
    with open('nontechnicalskills.csv', 'rb') as f:
        reader = csv.reader(f)
        your_list1 = list(reader)
    #Sets are used as it has a a constant time for lookup hence the overall the time for the total code will not exceed O(n)
    s = set(your_list[0])
    s1 = your_list
    s2 = your_listatt
    skillindex = []
    skills = []

    for word in resume_string.split(" "):
        if word in s:
            skills.append(word)
    skills1 = list(set(skills))
    print('\n')
    print("Following are his/her Technical Skills")
    print('\n')
    np_a1 = np.array(your_list)
    for i in range(len(skills1)):
        item_index = np.where(np_a1==skills1[i])
        skillindex.append(item_index[1][0])

    nlen = len(skillindex)
    for i in range(nlen):
        print(skills1[i])
        print('\n')
    return skills1