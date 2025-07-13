path="file.txt"
def write_inFile(lines):
    with open(path,'w') as file:
        file.writelines(lines)
def read_inFile():
    with open(path) as file:
        read_lines=file.readlines()
    return  read_lines
if __name__=="__main__":
    write_inFile("hello world")
    print(read_inFile())